import React, { useState } from 'react'
// @ts-expect-error not from type
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error not from type
import { docco } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './index.scss'
import { codeData } from './data'

const CodeBlock = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(1)
	const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(true)

	return (
		<div className="code-block-container">
			<div className="code-block-wrapper">
				<div
					className="header-wrapper"
					onClick={() => setIsCodeBlockOpen(!isCodeBlockOpen)}
				>
					<div className="heading">Code instructions</div>
					<div className="toggle-btn">V</div>
				</div>
				<div className={`code-block ${isCodeBlockOpen ? 'expand' : ''}`}>
					<Code language="javascript" code={codeData.binaryTree} />
					{!isCodeBlockOpen && (
						<div className="language-switcher-container">
							<div className="language-switcher-wrapper">
								{Array.from({ length: 5 }).map((_, ind: number) => (
									<LanguageSelector
										key={ind}
										selectedLanguage={selectedLanguage}
										setSelectedLanguage={setSelectedLanguage}
										ind={ind}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

type LanguageSelectorType = {
	setSelectedLanguage: React.Dispatch<React.SetStateAction<number>>
	selectedLanguage: number
	ind: number
}

const LanguageSelector: React.FC<LanguageSelectorType> = ({
	setSelectedLanguage,
	selectedLanguage,
	ind,
}) => {
	return (
		<div
			className={`language-option ${selectedLanguage === ind + 1 ? 'active' : ''}`}
			onClick={() => setSelectedLanguage(ind + 1)}
		>
			option {ind + 1}
		</div>
	)
}

const Code = ({ language, code }: { language: string; code: string }) => {
	return (
		<SyntaxHighlighter
			language={language}
			style={docco}
			showLineNumbers={true} // Enable line numbers
			wrapLines={true} // Optional: wrap lines if they are too long
			className="custom-syntax-highlighter"
		>
			{code}
		</SyntaxHighlighter>
	)
}

export default CodeBlock
