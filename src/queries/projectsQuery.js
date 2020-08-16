// Import the image assets for the screenshots of each project
import JimmyHomePage from "../assets/images/jimmyvanveen.com.jpg"
import CardGamesScreenshot from "../assets/images/card_games.jpg"
import HoudanaScreenshot from "../assets/images/houdana.com.jpg"
import FreeCodeCampScreenshot from "../assets/images/freeCodeCamp-solutions.jpg"
import LabelCreatorScreenshot from "../assets/images/label_creator.jpg"

/**
 *
 * @param {Array} repoIds an array of strings representing the Github project ID's to query their graphql api for
 *
 * @returns {Array} an array of project data as retrieved from the Github API
 */
export async function fetchRepos() {
  // Create a Map of GitHub projects. The key is the Github id of each project, the values will be added data will be used to enrich
  // the return values from the GitHub API. This data enrichment is only applicable to this application
  const projects = new Map([
    [
      "MDEwOlJlcG9zaXRvcnk4MTM4NjM5Mg==",
      { displayName: "Jimmy's Home Page", screenshot: JimmyHomePage },
    ],
    [
      "MDEwOlJlcG9zaXRvcnk4MTQ4MTM4Nw==",
      { displayName: "Card Games", screenshot: CardGamesScreenshot },
    ],
    [
      "MDEwOlJlcG9zaXRvcnk3NDA5ODIyNw==",
      { displayName: "Houdana", screenshot: HoudanaScreenshot },
    ],
    [
      "MDEwOlJlcG9zaXRvcnkxMDA0MjI3Mjk=",
      { displayName: "Free Code Camp", screenshot: FreeCodeCampScreenshot },
    ],
    [
      "MDEwOlJlcG9zaXRvcnk4MTQ3Nzg5OA==",
      { displayName: "List Generator", screenshot: LabelCreatorScreenshot },
    ],
  ])

  // Format a GraphQL query to fetch the requisite information from Github
  const query = `
    query {
      projects: nodes(ids:[
        ${Array.from(projects.keys(), repo => '"' + repo + '"\n')}
      ]) {
        ... on Repository {
          name
          id
          homepageUrl
          description
          url
          readme: object(expression: "master:README.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  `

  // Perform the operations
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GATSBY_GITHUB_API_KEY}`,
      },
      body: JSON.stringify({ query }),
    })
    const { data: responseAsJson } = await response.json()

    const data = responseAsJson?.projects || []

    // Enrich the GitHub data with the values from our project Map above
    return data.map(project => ({
      ...project,
      ...projects.get(project.id),
    }))
  } catch (err) {
    throw new Error("We got an error with some data here", err)
  }
}
