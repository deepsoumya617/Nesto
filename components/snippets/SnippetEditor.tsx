'use client'

import { useSnippetStore } from '@/store/useSnippetStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import TagInput from './TagInput'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { useTheme } from 'next-themes'
import { Geist_Mono, Geist } from 'next/font/google'
import { Check, Pencil, X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { JSX } from 'react'
import { langs } from '@uiw/codemirror-extensions-langs'
import { useGistImportStore } from '@/store/useGistImportStore'
import { useSnippetMobileModalStore } from '@/store/useSnippetMobileModalStore'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geist-mono',
})

const geist = Geist({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-geist',
})

// get full language name from extension
function getLanguageFromExtension(language: string | undefined) {
  switch (language) {
    case 'cpp':
      return langs.cpp()
    case 'js':
      return langs.javascript()
    case 'java':
      return langs.java()
    case 'py':
      return langs.python()
    case 'ts':
      return langs.typescript()
    case 'go':
      return langs.go()
    case 'tsx':
      return langs.tsx()
    case 'jsx':
      return langs.jsx()
    case 'rs':
      return langs.rust()
    case 'json':
      return langs.json()
    case 'xml':
      return langs.xml()
    default:
      return langs.cpp()
  }
}

// language icons
const languageIcons: Record<string, { icon: JSX.Element }> = {
  js: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2500"
        height="2500"
        viewBox="0 0 1052 1052"
      >
        <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
        <path
          d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
          fill="#323330"
        />
      </svg>
    ),
  },
  java: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <path
          fill="#5382A1"
          d="M36.753 77.336s-3.822 2.222 2.72 2.974c7.924.904 11.973.774 20.706-.879 0 0 2.296 1.44 5.502 2.687-19.576 8.39-44.304-.486-28.928-4.782M34.36 66.387s-4.286 3.173 2.26 3.85c8.464.873 15.149.945 26.716-1.283 0 0 1.6 1.622 4.116 2.51-23.668 6.92-50.03.545-33.092-5.077"
        />
        <path
          fill="#E76F00"
          d="M54.527 47.815c4.823 5.554-1.268 10.551-1.268 10.551s12.248-6.322 6.623-14.24C54.63 36.743 50.6 33.074 72.41 20.425c0 0-34.234 8.55-17.883 27.39"
        />
        <path
          fill="#5382A1"
          d="M80.418 85.434s2.827 2.33-3.115 4.133c-11.3 3.423-47.03 4.456-56.956.136-3.568-1.552 3.124-3.706 5.228-4.159 2.195-.475 3.45-.387 3.45-.387-3.968-2.795-25.648 5.49-11.012 7.861 39.913 6.473 72.757-2.914 62.405-7.584M38.59 55.044s-18.174 4.317-6.436 5.884c4.956.664 14.837.514 24.04-.258 7.522-.634 15.075-1.983 15.075-1.983s-2.653 1.136-4.571 2.446c-18.457 4.854-54.11 2.596-43.846-2.37 8.68-4.195 15.738-3.72 15.738-3.72m32.603 18.224c18.762-9.75 10.088-19.118 4.033-17.856-1.484.309-2.146.576-2.146.576s.551-.863 1.603-1.236c11.978-4.212 21.19 12.42-3.867 19.007 0 0 .29-.26.377-.491"
        />
        <path
          fill="#E76F00"
          d="M59.882 0s10.39 10.395-9.855 26.377C33.793 39.2 46.325 46.51 50.021 54.861c-9.477-8.55-16.432-16.077-11.766-23.082C45.103 21.496 64.075 16.51 59.882 0"
        />
        <path
          fill="#5382A1"
          d="M40.434 99.686c18.009 1.153 45.663-.64 46.318-9.161 0 0-1.259 3.23-14.883 5.796-15.371 2.892-34.329 2.555-45.573.7 0 0 2.302 1.906 14.138 2.665"
        />
      </svg>
    ),
  },
  py: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="16 16 32 32">
        <path
          fill="url(#a)"
          d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
        />
        <path
          fill="url(#b)"
          d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
        />
        <defs>
          <linearGradient
            id="a"
            x1="19.075"
            x2="34.898"
            y1="18.782"
            y2="34.658"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#387EB8" />
            <stop offset="1" stopColor="#366994" />
          </linearGradient>
          <linearGradient
            id="b"
            x1="28.809"
            x2="45.803"
            y1="28.882"
            y2="45.163"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFE052" />
            <stop offset="1" stopColor="#FFC331" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  ts: {
    icon: (
      <svg
        viewBox="0 0 256 256"
        width="256"
        height="256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
          fill="#3178C6"
        />
        <path
          d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
          fill="#FFF"
        />
      </svg>
    ),
  },
  cpp: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="288"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 288"
      >
        <path
          fill="#649AD2"
          d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"
        />
        <path
          fill="#004482"
          d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"
        />
        <path
          fill="#1A4674"
          d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"
        />
        <path
          fill="#01589C"
          d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"
        />
        <path
          fill="#FFF"
          d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"
        />
      </svg>
    ),
  },
  go: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <path
          fill="#00ACD7"
          d="M7.547 42.312c-.195 0-.243-.097-.146-.243l1.022-1.315c.098-.146.341-.243.536-.243H26.34c.194 0 .243.146.146.292l-.828 1.266c-.097.146-.34.292-.487.292zm-7.352 4.48c-.195 0-.243-.098-.146-.244l1.022-1.314c.098-.146.341-.244.536-.244h22.202c.195 0 .292.146.243.292l-.39 1.169c-.048.195-.243.292-.437.292zm11.783 4.48c-.195 0-.244-.147-.146-.293l.681-1.217c.098-.146.292-.292.487-.292h9.738c.195 0 .292.146.292.34l-.098 1.169c0 .195-.194.34-.34.34zm50.538-9.836c-3.067.779-5.16 1.363-8.18 2.142-.73.195-.779.244-1.411-.487-.73-.827-1.266-1.363-2.289-1.85-3.067-1.51-6.037-1.07-8.812.73-3.311 2.143-5.015 5.308-4.967 9.251.05 3.895 2.727 7.109 6.573 7.645 3.311.438 6.086-.73 8.277-3.214.439-.535.828-1.12 1.315-1.801h-9.397c-1.022 0-1.266-.633-.925-1.461.633-1.51 1.801-4.041 2.483-5.307.146-.292.487-.78 1.217-.78h17.723c-.098 1.316-.098 2.63-.292 3.945-.536 3.505-1.85 6.719-3.993 9.543-3.505 4.625-8.082 7.498-13.876 8.277-4.771.632-9.202-.293-13.097-3.214-3.603-2.726-5.648-6.33-6.184-10.809-.632-5.307.926-10.078 4.139-14.265 3.457-4.528 8.034-7.401 13.633-8.423 4.576-.828 8.958-.293 12.902 2.385 2.58 1.704 4.43 4.041 5.648 6.865.292.439.097.682-.487.828"
        />
        <path
          fill="#00ACD7"
          d="M78.632 68.36c-4.43-.097-8.472-1.362-11.88-4.284-2.872-2.483-4.674-5.648-5.258-9.397-.877-5.501.633-10.37 3.944-14.704 3.554-4.674 7.838-7.108 13.632-8.13 4.966-.877 9.64-.39 13.876 2.483 3.847 2.629 6.233 6.183 6.865 10.857.828 6.573-1.07 11.929-5.599 16.505-3.213 3.263-7.157 5.308-11.685 6.233-1.314.243-2.63.292-3.895.438M90.22 48.69c-.049-.632-.049-1.12-.146-1.606-.877-4.82-5.307-7.547-9.933-6.476-4.528 1.023-7.449 3.896-8.52 8.472-.876 3.798.974 7.644 4.48 9.202 2.677 1.169 5.355 1.023 7.936-.292 3.846-1.996 5.94-5.112 6.183-9.3"
        />
      </svg>
    ),
  },
  rs: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <path
          fill="#000"
          d="m99.317 48.775-4.198-2.6a57 57 0 0 0-.12-1.222l3.608-3.365a1.44 1.44 0 0 0 .432-1.339 1.44 1.44 0 0 0-.91-1.072l-4.613-1.724a54 54 0 0 0-.36-1.19l2.876-3.997a1.444 1.444 0 0 0-.94-2.27l-4.864-.792q-.284-.553-.584-1.092l2.043-4.485a1.44 1.44 0 0 0-.112-1.403 1.44 1.44 0 0 0-1.252-.641l-4.935.172q-.382-.48-.78-.946l1.134-4.808a1.444 1.444 0 0 0-1.738-1.739l-4.807 1.133a42 42 0 0 0-.947-.78l.172-4.935a1.44 1.44 0 0 0-1.327-1.491 1.44 1.44 0 0 0-.716.126l-4.484 2.044q-.543-.3-1.092-.586L70.01 4.91a1.446 1.446 0 0 0-2.27-.94l-4 2.876q-.59-.188-1.188-.36l-1.725-4.613a1.442 1.442 0 0 0-2.41-.48l-3.365 3.61a43 43 0 0 0-1.222-.12L51.23.685a1.445 1.445 0 0 0-2.456 0l-2.599 4.2q-.612.05-1.224.12l-3.366-3.611a1.443 1.443 0 0 0-2.41.48l-1.724 4.613q-.599.173-1.19.36L32.266 3.97a1.44 1.44 0 0 0-1.977.276 1.45 1.45 0 0 0-.294.664l-.793 4.864q-.55.285-1.092.586l-4.485-2.045a1.44 1.44 0 0 0-1.401.114 1.44 1.44 0 0 0-.642 1.252l.172 4.936q-.48.383-.948.78L16 14.261a1.45 1.45 0 0 0-1.723 1.012 1.44 1.44 0 0 0-.016.727l1.132 4.808q-.394.467-.777.946l-4.936-.172a1.45 1.45 0 0 0-1.252.64 1.44 1.44 0 0 0-.114 1.403l2.045 4.486q-.3.54-.586 1.092l-4.863.791a1.445 1.445 0 0 0-.94 2.271l2.877 3.997q-.189.59-.362 1.19l-4.612 1.724a1.446 1.446 0 0 0-.479 2.41l3.609 3.366q-.068.61-.12 1.223l-4.199 2.6a1.443 1.443 0 0 0 0 2.456l4.198 2.599q.053.614.12 1.223l-3.609 3.366a1.445 1.445 0 0 0 .479 2.41l4.612 1.724q.174.6.362 1.19L3.969 67.74a1.444 1.444 0 0 0 .941 2.27l4.862.791q.285.552.586 1.094l-2.045 4.484a1.44 1.44 0 0 0 .656 1.886c.22.113.463.167.71.158l4.933-.173q.386.48.78.948l-1.132 4.808a1.44 1.44 0 0 0 .385 1.351 1.44 1.44 0 0 0 1.354.384l4.806-1.132q.47.398.948.778l-.171 4.937a1.445 1.445 0 0 0 2.042 1.364l4.485-2.044q.542.301 1.092.586l.793 4.861a1.443 1.443 0 0 0 1.593 1.205 1.46 1.46 0 0 0 .678-.262l3.996-2.88q.591.19 1.19.363l1.725 4.61a1.44 1.44 0 0 0 1.072.911 1.44 1.44 0 0 0 1.338-.432l3.366-3.608q.61.068 1.223.122l2.6 4.198a1.446 1.446 0 0 0 2.456 0l2.598-4.198q.615-.053 1.223-.122l3.366 3.608a1.44 1.44 0 0 0 1.337.432 1.44 1.44 0 0 0 1.072-.91l1.725-4.611q.599-.173 1.19-.362l3.997 2.879a1.445 1.445 0 0 0 2.27-.943l.793-4.86q.55-.288 1.092-.587l4.484 2.044a1.442 1.442 0 0 0 2.043-1.364l-.171-4.937q.48-.38.946-.778l4.807 1.132c.488.115 1-.027 1.353-.384a1.44 1.44 0 0 0 .385-1.35l-1.132-4.81q.396-.467.777-.947l4.936.173a1.44 1.44 0 0 0 1.252-.641 1.44 1.44 0 0 0 .113-1.403l-2.044-4.484q.3-.542.585-1.093l4.863-.792a1.44 1.44 0 0 0 1.102-.873 1.44 1.44 0 0 0-.162-1.397l-2.877-3.996q.187-.593.362-1.19l4.611-1.726a1.44 1.44 0 0 0 .91-1.072 1.44 1.44 0 0 0-.431-1.337l-3.608-3.366q.066-.61.12-1.223l4.198-2.6a1.44 1.44 0 0 0 .684-1.227c0-.5-.258-.965-.683-1.228M71.218 83.6a2.975 2.975 0 0 1-2.278-3.534 2.966 2.966 0 0 1 3.524-2.283 2.974 2.974 0 0 1 2.28 3.532 2.973 2.973 0 0 1-3.526 2.285m-1.426-9.648a2.706 2.706 0 0 0-3.215 2.083l-1.49 6.956A36.4 36.4 0 0 1 50 86.239a36.4 36.4 0 0 1-15.402-3.394l-1.49-6.955a2.707 2.707 0 0 0-3.214-2.082l-6.14 1.318a36 36 0 0 1-3.176-3.742h29.879c.338 0 .563-.061.563-.369V60.446c0-.307-.225-.369-.563-.369h-8.738v-6.699h9.45c.863 0 4.614.246 5.813 5.04.375 1.474 1.2 6.27 1.764 7.805.561 1.722 2.848 5.161 5.286 5.161h14.889q.254-.002.54-.053a37 37 0 0 1-3.387 3.972zm-41.324 9.503a2.97 2.97 0 0 1-3.527-2.283 2.976 2.976 0 0 1 2.28-3.534 2.975 2.975 0 0 1 1.247 5.816M17.133 37.495a2.975 2.975 0 0 1-1.51 3.924 2.967 2.967 0 0 1-3.919-1.514 2.975 2.975 0 0 1 2.642-4.178 2.97 2.97 0 0 1 2.787 1.768m-3.484 8.258 6.397-2.843a2.71 2.71 0 0 0 1.377-3.577l-1.317-2.98h5.18V59.71H14.834a36.6 36.6 0 0 1-1.394-10.03c0-1.327.072-2.639.21-3.928m28.071-2.269V36.6H54.06c.637 0 4.5.737 4.5 3.625 0 2.398-2.963 3.258-5.4 3.258zm44.84 6.196q0 1.37-.1 2.715h-3.75c-.376 0-.527.246-.527.614v1.723c0 4.054-2.287 4.936-4.29 5.161-1.908.215-4.023-.799-4.284-1.967-1.126-6.33-3.001-7.682-5.963-10.018 3.676-2.334 7.5-5.778 7.5-10.387 0-4.977-3.412-8.111-5.737-9.648-3.263-2.151-6.875-2.582-7.85-2.582H22.765c5.26-5.872 12.39-10.03 20.454-11.544l4.573 4.797a2.703 2.703 0 0 0 3.828.088l5.116-4.893c10.72 1.996 19.798 8.67 25.028 17.825l-3.502 7.911a2.715 2.715 0 0 0 1.377 3.577l6.744 2.996q.177 1.794.178 3.632M47.795 9.666a2.97 2.97 0 0 1 4.198.097 2.977 2.977 0 0 1-.098 4.205 2.965 2.965 0 0 1-4.199-.098 2.977 2.977 0 0 1 .099-4.204M82.553 37.64a2.967 2.967 0 0 1 3.917-1.513 2.975 2.975 0 0 1-1.277 5.692 3 3 0 0 1-1.13-.254 2.98 2.98 0 0 1-1.51-3.925"
        />
      </svg>
    ),
  },
  jsx: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 101 100">
        <path
          fill="#61DAFB"
          d="M50.307 58.816a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M50.307 68.063c26.126 0 47.306-8.087 47.306-18.063s-21.18-18.062-47.306-18.062C24.18 31.938 3 40.024 3 50s21.18 18.063 47.307 18.063Z"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M34.664 59.031C47.727 81.658 65.321 95.957 73.96 90.97c8.64-4.988 5.053-27.374-8.01-50C52.885 18.342 35.291 4.043 26.652 9.03s-5.052 27.374 8.011 50Z"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M34.664 40.969c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.988 26.232-9.311 39.295-31.938s16.65-45.012 8.01-50c-8.638-4.988-26.232 9.311-39.295 31.938Z"
        />
      </svg>
    ),
  },
  tsx: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 101 100">
        <path
          fill="#61DAFB"
          d="M50.307 58.816a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M50.307 68.063c26.126 0 47.306-8.087 47.306-18.063s-21.18-18.062-47.306-18.062C24.18 31.938 3 40.024 3 50s21.18 18.063 47.307 18.063Z"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M34.664 59.031C47.727 81.658 65.321 95.957 73.96 90.97c8.64-4.988 5.053-27.374-8.01-50C52.885 18.342 35.291 4.043 26.652 9.03s-5.052 27.374 8.011 50Z"
        />
        <path
          stroke="#61DAFB"
          strokeWidth="5"
          d="M34.664 40.969c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.988 26.232-9.311 39.295-31.938s16.65-45.012 8.01-50c-8.638-4.988-26.232 9.311-39.295 31.938Z"
        />
      </svg>
    ),
  },
  xml: {
    icon: <img src="/xml.svg" />,
  },
  json: {
    icon: <img src="/json.svg" />,
  },
}

export default function SnippetEditor({ className }: { className?: string }) {
  const {
    title,
    fileName,
    content,
    language,
    tags,
    mode,
    isSaving,
    setTitle,
    setFileName,
    setContent,
    setLanguage,
    setTags,
    setMode,
    handleCreateSnippet,
    handleUpdateSnippet,
  } = useSnippetStore()

  const { gistSnippet } = useGistImportStore()
  const { isMobile } = useSnippetMobileModalStore()

  const isEditable = mode === 'create' || mode === 'edit'

  const { resolvedTheme } = useTheme()
  const languageExtension = getLanguageFromExtension(language)

  // set custom font
  const customFontTheme = EditorView.theme({
    '.cm-content': {
      fontFamily: geistMono.style.fontFamily,
      fontSize: '13px',
      fontWeight: '400', // Increase font weight
      lineHeight: '1.7', // Increase line height
      letterSpacing: '0.04em',
      paddingTop: '8px',
      paddingLeft: '4px'
    },
    '.cm-gutters': {
      letterSpacing: '0.05em',
      paddingRight: '12px',
      paddingLeft: '12px',
    },
    '.cm-lineNumbers': {
      fontFamily: geistMono.style.fontFamily,
      fontSize: '12px',
      letterSpacing: '0.02em',
      fontWeight: '400', // Make line numbers match
    },
  })

  // transparent background for code editor
  const transparentBackground = EditorView.theme({
    '&': {
      backgroundColor: 'transparent !important',
    },
    // '.cm-scroller': {
    //   backgroundColor: 'transparent !important',
    // },
    // '.cm-gutters': {
    //   backgroundColor: 'transparent !important',
    //   border: 'none',
    // },
  })

  // Remove outline
  const removeFocusOutline = EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  })

  return (
    <div
      className={`${className ?? 'hidden pb-5 md:flex'} flex max-h-screen flex-1 flex-col overflow-y-auto`}
    >
      {/* title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Snippet Title"
        className="w-full border-b py-5 pl-7 font-semibold tracking-wide outline-none"
        required
        disabled={!isEditable}
      />

      {/* filename + language */}
      <div className="flex items-center justify-between border-b">
        <input
          type="text"
          placeholder="Filename(without extension)"
          className="w-4/5 border-r py-5 pl-7 font-semibold tracking-wide outline-none"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
          disabled={!isEditable}
        />
        <div
          className={`w-1/5 text-center ${!isEditable || mode !== 'create' || gistSnippet?.language ? 'pointer-events-none' : ''}`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer font-semibold tracking-wide text-neutral-500">
              {language || 'lang'}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 rounded border bg-white px-2 py-2 dark:bg-black">
              {[
                'cpp',
                'js',
                'ts',
                'java',
                'py',
                'rs',
                'go',
                'xml',
                'json',
                'jsx',
                'tsx',
              ].map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="cursor-pointer"
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* tags */}
      <TagInput
        tags={tags ?? []}
        setTags={setTags}
        isEditable={mode === 'create'}
      />

      <div className="px-6 py-3">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 rounded-md px-4 py-1.5 text-[13px]"
        >
          <span className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full">
            {languageIcons[language]?.icon ?? null}
          </span>
          {fileName && language && (
            <p className={`${geist.className}`}>{`${fileName}.${language}`}</p>
          )}
        </Badge>
      </div>

      {/* snippet editor */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? ' pr-6' : ''}`}>
        <CodeMirror
          value={content}
          onChange={(value) => setContent(value)}
          theme={resolvedTheme === 'light' ? githubLight : githubDark}
          editable={isEditable}
          extensions={[
            languageExtension,
            customFontTheme,
            removeFocusOutline,
            transparentBackground,
          ]}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            highlightSelectionMatches: false,
            foldGutter: false,
          }}
        />
      </div>

      {/* edit button */}
      {mode !== 'edit' && (
        <button
          className="fixed top-72 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center gap-3 sm:right-10 md:right-5 lg:right-5 xl:right-40 2xl:right-56 bg-zinc-100 rounded-full"
          onClick={() => setMode('edit')}
        >
          <Pencil
            strokeWidth={2}
            className="text-black dark:text-white"
            size={18}
          />
        </button>
      )}

      {/* fab */}
      {isEditable && (
        <div className="fixed right-4 bottom-8 z-50 flex gap-3 sm:right-10 md:right-5 lg:right-5 xl:right-40 2xl:right-56">
          <button
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black transition-colors hover:bg-black/85 dark:bg-white dark:hover:bg-white/85"
            onClick={() => {
              if (mode === 'create') handleCreateSnippet()
              if (mode === 'edit') handleUpdateSnippet()
            }}
            disabled={isSaving}
          >
            <Check
              strokeWidth={2.4}
              className={
                isSaving
                  ? 'text-white/70 dark:text-black/70'
                  : 'text-white dark:text-black'
              }
            />
          </button>
          <button
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-red-600"
            onClick={() => {
              if (mode === 'edit') return setMode('view')
              if (mode === 'create') {
                setTitle('')
                setContent('')
                return setMode('create')
              }
              setMode('view')
            }}
          >
            <X strokeWidth={2.4} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
