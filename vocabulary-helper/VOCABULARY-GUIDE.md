# Vocabulary Processing Guide

## How to add your words to the quiz

### Step 1: Prepare your vocabulary file

- Save your words in a text file (e.g., `raw-vocabulary.txt`)
- Make sure each line follows one of the following formats:
  - `行く[いく]:go` (for words with kanji and hiragana)
  - `これ:this, this one` (for words without kanji)

### Step 2: Run the processing script

The script accepts the following arguments:

```text
process-vocabulary.js <input-file.txt> [output-file.ts] [start-index]
```

For example:

```bash
bun process-vocabulary.js raw-vocabulary.txt processed-vocabulary.ts 156
```

### Step 3: Add to your vocabulary file

1. Open the generated `processed-vocabulary.ts` file
2. Copy all the content
3. Open your `src/data/vocabulary.ts` file
4. Add the new entries before the closing `];` of the `vocabularyData` array

The script will generate entries like:

```json
 {
   id: 156,
   kanji: "行く",
   hiragana: "いく",
   romanji: "iku",
   english: "go",
 },
```

### Step 4: Update the final structure

Your `vocabulary.ts` file should look like this:

```typescript
export const vocabularyData: VocabularyItem[] = [
  // Basic greetings (existing 155 entries)
  {
    id: 1,
    kanji: "こんにちは",
    // ... existing entries ...
  },

  // New vocabulary entries (845+ new entries)
  {
    id: 156,
    kanji: "行く",
    hiragana: "いく",
    romanji: "iku",
    english: "go",
  },
  // ... paste all processed entries here ...
];
```

### Notes

- The script automatically handles hiragana-to-romanji conversion
- IDs are assigned sequentially starting from the provided start index, or from 1 if none is supplied
- Unknown hiragana characters are kept as-is
- The script supports common Japanese characters and combinations
