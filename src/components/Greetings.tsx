const Greetings = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-60">
      <h1 className="text-4xl font-bold">{text}</h1>
    </div>
  )
}

export default Greetings
