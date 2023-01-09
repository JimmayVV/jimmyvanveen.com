// Libs
import { Link, useLoaderData } from "@remix-run/react"
import { json, redirect, type LoaderArgs } from "@remix-run/node"
import ReactMarkdown from "react-markdown"
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

// Components
import Banner from "~/components/banner"
import Slices from "~/components/slices"
import SliceContent from "~/components/slice-content"

// Utils
import { getBlogPostBySlug } from "~/utils/contentful.server"

export async function loader({ params }: LoaderArgs) {
  const slug: string = params.slug
  const blog = await getBlogPostBySlug(slug)

  if (!blog) {
    return redirect("/blog", { status: 302 })
  }

  return json(blog)
}

export default function Index() {
  const blog = useLoaderData<typeof loader>()

  return (
    <div>
      <Banner>
        <h2 className="border-b-2 border-b-zinc-500/50 text-4xl mb-6 pb-4 leading-[60px] font-bold tracking-widest">
          {blog.fields.title}
        </h2>
        <p className="leading-8 tracking-widest">{blog.fields.description}</p>
      </Banner>
      <Slices colors={["#333"]} staticAlignment>
        <SliceContent>
          <div id="blogContent">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "")
                  return !inline && match ? (
                    <SyntaxHighlighter
                      showLineNumbers
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {blog.fields.body}
            </ReactMarkdown>
          </div>
        </SliceContent>
      </Slices>
    </div>
  )
}
