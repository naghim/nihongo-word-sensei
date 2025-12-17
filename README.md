# Nihongo Word Sensei Quiz

Interactive Japanese vocabulary quiz built with React, Vite, and Tailwind CSS. The app lets you practice kanji, hiragana, and English meanings across multiple quiz modes while tracking score, streaks, and session progress.

The project uses the core 1,000 words from the iKnow.jp course, sourced via [this Reddit post](https://www.reddit.com/r/japanese/comments/g87bn7/top_1000_japanese_words_kanji_romaji_english/).

Quiz directions include:

- Kanji → English
- Romaji → English
- English → Kanji

You receive instant feedback after each answer.
The source code is open so you can add your own vocabulary using the helper scripts found in the `vocabulary-helper` folder.

## Getting started

Try it quickly [here](https://nihongo.naghi.me)!

### Installation

Bun is my preferred runtime, but npm works just as well for building and running the project.

```bash
bun i
bun run dev
```

```bash
npm install
npm run dev
```

### Managing vocabulary

- primary dataset lives in `src/data/vocabulary.ts`
- use the helper script `process-vocabulary.js` to transform raw word lists
- detailed steps are documented in the [Vocabulary Guide](./vocabulary-helper/VOCABULARY-GUIDE.md)
- output can also be previewed before merging into the main dataset

## Contributing & maintenance

Contributions are always welcome. Ideas for future expansion include:

- persist quiz progress and high scores across sessions
- add spaced repetition or adaptive difficulty based on performance
- support audio prompts and furigana hints
- integrate external APIs for fetching example sentences or usage notes
