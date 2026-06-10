import type { PosterTemplate } from '../types'

export interface PosterTemplateConfig {
  value: PosterTemplate
  label: string
  previewColors: [string, string, string]
  bgGradient: [string, string]
  textColor: string
  accentColor: string
  subtitleColor: string
  pawPrintColor: string
  qrDarkColor: string
  qrLightColor: string
}

export const POSTER_TEMPLATES: PosterTemplateConfig[] = [
  {
    value: 'warm',
    label: '温暖奶油橘',
    previewColors: ['#FFF2E0', '#8B6F47', '#F5A962'],
    bgGradient: ['#FFF9F2', '#FFE8CC'],
    textColor: '#5C4033',
    accentColor: '#F5A962',
    subtitleColor: '#8B6F47',
    pawPrintColor: '#FFE0C2',
    qrDarkColor: '#8B6F47',
    qrLightColor: '#FFF9F2',
  },
  {
    value: 'cool',
    label: '薄荷蓝清新',
    previewColors: ['#E0EFF8', '#2C5F7D', '#63B583'],
    bgGradient: ['#F0F7FC', '#D4EAF5'],
    textColor: '#2C5F7D',
    accentColor: '#63B583',
    subtitleColor: '#5A8BAE',
    pawPrintColor: '#CFE7F2',
    qrDarkColor: '#2C5F7D',
    qrLightColor: '#F0F7FC',
  },
  {
    value: 'classic',
    label: '古风水墨',
    previewColors: ['#F5F0E6', '#3D3224', '#8B6F47'],
    bgGradient: ['#FAF6EF', '#EDE4D3'],
    textColor: '#3D3224',
    accentColor: '#8B6F47',
    subtitleColor: '#6B5D4D',
    pawPrintColor: '#E8DCC8',
    qrDarkColor: '#3D3224',
    qrLightColor: '#FAF6EF',
  },
  {
    value: 'cute',
    label: '可爱粉白',
    previewColors: ['#FFE0E6', '#C74B7A', '#FF91A4'],
    bgGradient: ['#FFF0F3', '#FFD6E0'],
    textColor: '#A8365D',
    accentColor: '#FF91A4',
    subtitleColor: '#D47A94',
    pawPrintColor: '#FFCCDD',
    qrDarkColor: '#A8365D',
    qrLightColor: '#FFF0F3',
  },
]

export const PET_EMOJIS = [
  '🐱', '🐶', '🐰', '🐻', '🦊',
  '🐼', '🐨', '🐯', '🦁', '🐸',
]

export const getTemplateConfig = (templateId: PosterTemplate): PosterTemplateConfig => {
  return POSTER_TEMPLATES.find(t => t.value === templateId) || POSTER_TEMPLATES[0]
}
