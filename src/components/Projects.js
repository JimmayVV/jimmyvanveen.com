// Libs
import React from 'react'
import { useQuery } from "react-query";

import pic4 from '../assets/images/pic04.jpg';
import pic5 from '../assets/images/pic05.jpg';
import pic6 from '../assets/images/pic06.jpg';
import pic7 from '../assets/images/pic07.jpg';

import { fetchRepos } from '../queries/projectsQuery'

const pictures = [pic4, pic5, pic6, pic7];

export default function Projects() {

  // @see `react-query` docs for what these arguments do, and what other arguments are available
  const queryArgs = {
    staleTime: Infinity,
    cacheTime: Infinity,
  }

  // Fetch the data from GitHub
  const { data: projectsData, status, error } = useQuery("projects", () => fetchRepos(), queryArgs);

  // Handle the error and loading states
  if (status === "loading") return <div className="wrapper"><div className="inner">Loading</div></div>;
  if (error) return <div className="wrapper"><div className="inner">There was trouble loading project data from GitHub</div></div>;

  // When we have valid information from the API, render it
  return (
    <section id="four" className="wrapper alt style1">
      <div className="inner">
        <h2 className="major">My Projects</h2>
        <p>
          Here is a small collection of personal projects I have worked on. While
          many of these projects are quite old at this point, some may be more recent.
          Feel free to take any inspiration you wish from these codebases.
        </p>
        <section className="features">
          {projectsData.map((project, index) => {
            return (
              <article key={`project-${index}`}>
                <a href="/#" className="image">
                  <img
                    src={
                      project?.screenshot ?
                        project.screenshot :
                        pictures[(Math.floor(Math.random() * pictures.length))]
                    }
                    alt={`${project.name} project screenshot`}
                  />
                </a>
                <h3 className="major">{project.name}</h3>

                {project.description !== undefined && <p>
                  {project.description}
                </p>}

                {project.url !== undefined && <a href={project.url} target="_blank" rel="noopener noreferrer" className="special">
                  Learn More
                </a>}

                {project.homepageUrl !== undefined && <a href={project.homepageUrl} target="_blank" rel="noopener noreferrer" className="special">
                  View Live Demo
                </a>}
              </article>
            )
          })}
        </section>
        <ul className="actions">
          <li>
            <a href="https://github.com/JimmayVV?tab=repositories" target="_blank" rel="noopener noreferrer" className="button">
              Browse All
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
