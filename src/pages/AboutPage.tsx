import '../styles/about-page.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <h2>About</h2>
      <p className="about-text">
        Hi! My name is Liza, and I built this app as part of my learning journey in the React course
        by RSSchool. Through this project, I practiced using modern tools like React, React Router,
        hooks and more. It helped me understand how real-world web applications are structured —
        from routing to creating own hooks. Thanks for visiting!
      </p>
      <div className="links">
        <a href="https://github.com/ElizavetaAbramova" target="_blank" className="GitHub-link">
          <span className="tooltip">My GitHub</span>
          <img
            src="/assets/github-icon.png"
            alt="GitHub-logo"
            width={100}
            height={100}
            className="github-logo"
          ></img>
        </a>

        <a href="https://rs.school/courses/reactjs" target="_blank" className="course-link">
          <span className="tooltip">React course</span>
          <img
            src="/assets/react.svg"
            width={100}
            height={100}
            alt="react-logo"
            className="react-logo"
          />
        </a>
      </div>
    </div>
  )
}
