#!/usr/bin/env node

/**
 * Vocabulary Processing Script
 * 
 * This script processes Japanese vocabulary from a text file in the format:
 * 行く[いく]:go
 * 
 * And converts it to TypeScript vocabulary entries
 */

import fs from 'fs';
import path from 'path';
import { start } from 'repl';

// Helper function to convert hiragana to romanji
function hiraganaToRomanji(hiragana) {
  const hiraganaMap = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'wo', 'ん': 'n',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'っか': 'kka', 'っき': 'kki', 'っく': 'kku', 'っけ': 'kke', 'っこ': 'kko',
    'っさ': 'ssa', 'っし': 'sshi', 'っす': 'ssu', 'っせ': 'sse', 'っそ': 'sso',
    'った': 'tta', 'っち': 'tchi', 'っつ': 'ttsu', 'って': 'tte', 'っと': 'tto',
    'っぱ': 'ppa', 'っぴ': 'ppi', 'っぷ': 'ppu', 'っぺ': 'ppe', 'っぽ': 'ppo',
    'っ': 'tsu'
  };

  let romanji = '';
  let i = 0;
  
  while (i < hiragana.length) {
    // Check for 3-character combinations first
    if (i + 2 < hiragana.length) {
      const threeChar = hiragana.substr(i, 3);
      if (hiraganaMap[threeChar]) {
        romanji += hiraganaMap[threeChar];
        i += 3;
        continue;
      }
    }
    
    // Check for 2-character combinations
    if (i + 1 < hiragana.length) {
      const twoChar = hiragana.substr(i, 2);
      if (hiraganaMap[twoChar]) {
        romanji += hiraganaMap[twoChar];
        i += 2;
        continue;
      }
    }
    
    // Check for single character
    const oneChar = hiragana.charAt(i);
    if (hiraganaMap[oneChar]) {
      romanji += hiraganaMap[oneChar];
    } else {
      romanji += oneChar; // Keep unknown characters as is
    }
    i++;
  }
  
  return romanji;
}

function processVocabularyFile(inputFile, outputFile, startIndex) {
  try {
    console.log('Reading vocabulary file...');
    const content = fs.readFileSync(inputFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    console.log(`Processing ${lines.length} vocabulary entries...`);
    
    let entries = [];
    let currentId = startIndex;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      // Parse format: 行く[いく]:go or これ:this
      let kanji, hiragana, english;
      
      // Check if line has kanji with hiragana in brackets
      const kanjiMatch = trimmedLine.match(/^([^[\]]+)\[([^\]]+)\]:(.+)$/);
      if (kanjiMatch) {
        [, kanji, hiragana, english] = kanjiMatch;
      } else {
        // Check if line has no kanji (just hiragana/katakana:english)
        const hiraganaMatch = trimmedLine.match(/^([^:]+):(.+)$/);
        if (hiraganaMatch) {
          [, hiragana, english] = hiraganaMatch;
          kanji = hiragana; // Use hiragana as kanji when no kanji is present
        } else {
          console.warn(`Could not parse line: ${trimmedLine}`);
          continue;
        }
      }
      
      const romanji = hiraganaToRomanji(hiragana.trim());
      
      const entry = {
        id: currentId++,
        kanji: kanji.trim(),
        hiragana: hiragana.trim(),
        romanji: romanji,
        english: english.trim()
      };
      
      entries.push(entry);
    }
    
    console.log(`Successfully processed ${entries.length} entries.`);
    
    // Generate TypeScript code
    const tsCode = entries.map(entry => 
      `  {
    id: ${entry.id},
    kanji: "${entry.kanji}",
    hiragana: "${entry.hiragana}",
    romanji: "${entry.romanji}",
    english: "${entry.english}",
  },`
    ).join('\n');
    
    fs.writeFileSync(outputFile, tsCode);
    console.log(`Generated TypeScript code saved to: ${outputFile}`);
    console.log(`\nYou can now copy the content from ${outputFile} and replace the entire vocabularyData array in your vocabulary.ts file.`);
    console.log(`The entries will have IDs from 1 to ${currentId - 1}.`);
    
  } catch (error) {
    console.error('Error processing vocabulary file:', error.message);
  }
}

// Main execution
const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'vocabulary-output.ts';
const startIndex = process.argv[4] || 1;

if (!inputFile) {
  console.log('Usage: node process-vocabulary.js <input-file.txt> [output-file.ts] [start-index]');
  console.log('');
  console.log('Example:');
  console.log('  node process-vocabulary.js vocabulary.txt processed-vocabulary.ts 1');
  console.log('');
  console.log('Input file should contain lines in the format:');
  console.log('  行く[いく]:go');
  console.log('  見る[みる]:see, look at');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

processVocabularyFile(inputFile, outputFile, startIndex);
