'use client'
import Image from 'next/image'
import '../../../styles/about-page.css'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div className="about-page">
      <h2>{t('title')}</h2>
      <p className="about-text">{t('text')}</p>
      <div className="links">
        <a href="https://github.com/ElizavetaAbramova" target="_blank" className="GitHub-link">
          <span className="tooltip">{t('github')}</span>
          <Image
            src="/assets/github-icon.png"
            alt="GitHub-logo"
            width={100}
            height={100}
            className="github-logo"
          ></Image>
        </a>

        <a href="https://rs.school/courses/reactjs" target="_blank" className="course-link">
          <span className="tooltip">{t('course')}</span>
          <Image
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
