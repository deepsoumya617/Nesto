export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl min-h-screen mx-auto flex flex-col px-5 py-6">
      {children}
    </div>
  )
}
