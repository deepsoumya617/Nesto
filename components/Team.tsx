export default function Team() {
  return (
    <section className="font-geist w-full px-4 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl tracking-tighter md:text-4xl">
          Meet the Team.
        </h2>
        <p className="text-muted-foreground mx-auto mt-1 max-w-2xl text-[16px] tracking-tight">
          We're the makers of Nesto — designing, coding, <br />
          and shipping everything you see here.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        {[
          {
            name: 'Soumyadeep Ghosh',
            username: 'deepsoumya617',
            avatar: 'https://github.com/deepsoumya617.png',
            url: 'https://github.com/deepsoumya617',
            role: 'Founder | Lead Developer',
          },
          {
            name: 'Manish Karmakar',
            username: 'i-mkarmakar',
            avatar: 'https://github.com/i-mkarmakar.png',
            url: 'https://github.com/i-mkarmakar',
            role: 'Core Contributor',
          },
        ].map((founder) => (
          <div
            key={founder.username}
            className="flex flex-col items-center text-sm"
          >
            <img
              src={founder.avatar}
              alt={founder.name}
              className="h-14 w-14 cursor-pointer rounded-full"
              onClick={() => window.open(founder.url, '_blank')}
            />
            <span className="mt-2 flex flex-col items-center tracking-tight text-black">
              <p className="text-[14px] font-medium md:text-[16px]">
                {founder.name}
              </p>
              <p className="text-muted-foreground text-[13px]">
                {founder.role}
              </p>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
