// Libs
import * as React from "react"
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"

// Components
import Banner from "~/components/banner"
import Slices from "~/components/slices"
import SliceContent from "~/components/slice-content"
import MainLink from "~/components/main-link"
import Project from "~/components/project"

// Utils
import { getRepositoriesByNodeId } from "~/utils/github.server"
import { getProjects } from "~/utils/contentful.server"

type Repository = {
  /** The name of the repository */
  name: string
  /** The ID of the repository */
  id: number
  /** The URL for the repository on GitHub */
  homepageUrl: string | null
  /** The description of the repository */
  description: string | null
  /** The URL for the repository on GitHub */
  url: string
  /** The URL for the screenshot */
  screenshotUrl?: string
}

export async function loader() {
  const projects = await getProjects()

  const repos = await getRepositoriesByNodeId(
    projects
      .sort((a, b) => Number(a.fields.priority) - Number(b.fields.priority))
      .map(p => p.fields.ghId),
  )

  const repositories: Repository[] = repos.map(repo => {
    const project = projects.find(p => p.fields.ghId === repo.node_id)

    return {
      name: repo.name,
      id: repo.id,
      homepageUrl: repo.homepage,
      description: repo.description,
      url: repo.html_url,
      screenshotUrl: project?.fields?.screenshot?.fields?.file?.url,
    }
  })

  return json<Repository[]>(repositories)
}

export default function Index() {
  const repos = useLoaderData<typeof loader>()

  return (
    <div>
      <Banner>
        <BannerContent />
      </Banner>
      <Slices colors={["#21d", "#1e0ed0", "#1b0cc4", "#333"]}>
        <SliceContent
          title="Watch out for me in Sim!"
          image="/images/jimmy_car.png"
          footer={
            <MainLink
              to="https://members.iracing.com/membersite/member/CareerStats.do?custid=106684"
              external
            >
              Visit my member profile (Membership Required)
            </MainLink>
          }
        >
          You can find me in the sim racing a Beta UI (BUI) paint scheme, or if
          you're lucky, you'll find me as one of your AI opponents if you happen
          to let the BUI create a roster for you. Be gentle with me when you
          find me, and be sure to let me win!
        </SliceContent>
        <SliceContent
          title="My Blog"
          footer={<MainLink to="/blog">Learn More</MainLink>}
          image="/images/blog_vscode.jpg"
        >
          My blog, documenting basically whatever I feel like. I am intending on
          using this space to document some tricky, non-proprietary patterns I
          needed to discover/develop for my work at iRacing. Some of these
          patterns are very time sensitive, meaning the value may very well be
          outdated in some not so distant future. Even knowing that this I will
          endeavor to keep the most pertinent blog posts up to date if any minor
          changes occur that would otherwise prevent the topic from keeping
          fresh.
        </SliceContent>
        <SliceContent
          title="Our Tech Stack"
          footer={
            <MainLink
              to="https://www.iracing.com/category/all-news/blog/"
              external
            >
              Learn More
            </MainLink>
          }
          image="/images/pic03.jpg"
        >
          Our current tech stack consists of consuming dozens of microservice
          API's across a persistent and secure socket.io websocket tunnel. The
          core BetaUI application is a complex React & Redux architecture,
          running inside a custom Electron application container in constant
          communication with a locally installed microservice application
          serving as the portal between the iRacing simulation executable, and
          this web application.
        </SliceContent>
        <SliceContent title="My Projects" flip={false}>
          <p className="mb-4">
            Here is a small collection of personal projects I have worked on.
            While many of these projects are quite old at this point, some may
            be more recent. Feel free to take any inspiration you wish from
            these codebases.
          </p>
          <section className="grid grid-cols-2 gap-8 pb-10">
            {repos.map(repo => {
              return (
                <Project
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                  repoUrl={repo.url}
                  url={repo.homepageUrl}
                  screenshotUrl={repo.screenshotUrl}
                />
              )
            })}
          </section>
          <a
            href="https://github.com/JimmayVV?tab=repositories"
            className="uppercase font-raleway font-bold text-sm tracking-widest rounded border-2 border-white/30 px-10 py-4 hover:bg-white/10"
            target="_blank"
          >
            Browse All
          </a>
        </SliceContent>
      </Slices>
    </div>
  )
}

function BannerContent() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <div
        className={`w-20 h-20 leading-5 transition duration-1000 border-2 rounded-full border-zinc-500/50 px-5 pt-6 mb-8 ${
          loaded ? "" : "translate-y-2 opacity-0"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path
            fill="white"
            d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
          />
        </svg>
      </div>
      <h2
        className={`blur-0 delay-700 border-b-2 border-b-zinc-500/50 text-4xl mb-6 pb-4 transition duration-500 leading-[60px] font-bold tracking-widest ${
          loaded ? "" : "translate-x-1 opacity-0 blur-sm"
        }`}
      >
        Jimmy Van Veen
      </h2>
      <p
        className={`delay-[0.8s] transition duration-500 mb-8 tracking-widest text-base ${
          loaded ? "" : "translate-x-2 opacity-0 blur-sm"
        }`}
      >
        Full time Web Developer. Part time speed demon.
      </p>
    </>
  )
}
