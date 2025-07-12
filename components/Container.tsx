export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl min-h-screen mx-auto flex flex-col px-5 mt-7">
      {children}
    </div>
  )
}
