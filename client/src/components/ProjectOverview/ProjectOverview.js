import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

import SectionTitle from '../SectionTitle/SectionTitle';

import projectData from '../../assets/data/project';
import './ProjectOverview.css';

function ProjectOverview() {
    return (
        <section aria-label='recent projects' id='project'>
            <SectionTitle title={'Recent Activity'} />

            {projectData && projectData.filter((item) => item.fav === true).slice(0,3).map((project, index) => (
                <div className='project-wrapper'>
                    <div key={index} className='project-container animated-border'>
                        <div className='project-image'>
                            <Link to={project.path.demo}>
                                <div className='image-wrapper'>
                                    <div className='image-border'></div>
                                    <div className='image-cover'></div>
                                    <img src={project.img} alt='' loading='lazy'></img>
                                </div>
                            </Link>
                        </div>

                        <div className='project-content'>
                            <p className='project-title'>
                                <span>{project.title}</span>
                                <span className='project-link'>
                                    <a href={project.path.git}><FaIcons.FaGithub /></a>
                                    <Link to={project.path.demo}><FaIcons.FaExternalLinkAlt /></Link>
                                </span>
                            </p>
                            <hr />
                            <p className='project-description'>
                                {project.desc}
                            </p>
                            <p className='project-tech-stack'>
                                {project.tech.map((tech, index) => (
                                    <span key={index}>
                                        <a href={tech.src}>{tech.title}</a>
                                    </span>
                                ))}
                            </p>

                        </div>
                    </div>
                </div>
            ))}

            <button><Link to='/project'>See More of My Work</Link></button>
        </section>
    );
}

export default ProjectOverview;