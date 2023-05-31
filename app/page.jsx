import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className = "head_text text-center">
        Discover And Share
        <br className = "max-md:hidden" />
        <span className = "orange_gradient tex-ceneter">
          AI Powered Prompts
        </span>
      </h1>
      <p className = "desc text-center">
        Promptopia is an open source tool for creating, discover, and sharing interesting AI prompts
      </p>
    <Feed/>
    </section>

  )
}

export default Home
