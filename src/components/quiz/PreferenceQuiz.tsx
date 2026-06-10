import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  CAT_BREEDS,
  DOG_BREEDS,
  COAT_COLORS,
  PERSONALITIES,
  STYLE_PREFERENCES,
} from '@/data/presetOptions';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import type { PetSpeciesType, Gender } from '@/types';

const TOTAL_STEPS = 5;

export default function PreferenceQuiz() {
  const store = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const [species, setSpecies] = useState<PetSpeciesType | null>(null);
  const [breed, setBreed] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>('unknown');
  const [coatColors, setCoatColors] = useState<string[]>([]);
  const [personalities, setPersonalities] = useState<string[]>([]);
  const [stylePreferences, setStylePreferences] = useState<string[]>([]);

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setSlideDirection('right');
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setSlideDirection('left');
      setCurrentStep((s) => s - 1);
    }
  };

  const toggleCoatColor = (value: string) => {
    setCoatColors((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const togglePersonality = (value: string) => {
    setPersonalities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleStyle = (value: string) => {
    setStylePreferences((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleComplete = () => {
    const patch: Record<string, unknown> = {
      gender,
      coatColors,
      personalities,
      stylePreferences,
    };
    if (species) {
      patch.species = species;
    }
    if (species === 'cat' && breed) {
      patch.catBreed = breed;
    }
    if (species === 'dog' && breed) {
      patch.dogBreed = breed;
    }
    store.setUserPreference(patch);
    store.generateNames();
    setTimeout(() => {
      const el = document.getElementById('recommend');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSkip = () => {
    store.generateNames();
    setTimeout(() => {
      const el = document.getElementById('recommend');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const breeds = species === 'cat' ? CAT_BREEDS : DOG_BREEDS;
  const canGoNext =
    (currentStep === 1 && species !== null) ||
    (currentStep === 2 && breed !== null) ||
    currentStep >= 3;

  const stepLabel = (step: number) => {
    switch (step) {
      case 1:
        return '宠物种类';
      case 2:
        return '细分品种';
      case 3:
        return '性别';
      case 4:
        return '毛色性格';
      case 5:
        return '喜好风格';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                      isCompleted && 'bg-mint-400 text-white',
                      isCurrent && 'bg-orange-400 text-white scale-110 shadow-lg',
                      !isCompleted && !isCurrent && 'bg-gray-100 text-gray-400'
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium transition-colors duration-300',
                      isCurrent ? 'text-orange-500' : isCompleted ? 'text-mint-500' : 'text-gray-400'
                    )}
                  >
                    {stepLabel(step)}
                  </span>
                </div>
                {step < TOTAL_STEPS && (
                  <div className="flex-1 mx-2 mt-[-1.5rem]">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all duration-500',
                          step < currentStep ? 'bg-mint-400 w-full' : 'bg-orange-400 w-0'
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${(currentStep - 1) * -100}%)`,
          }}
        >
          <StepCard>
            <StepTitle emoji="🐾" title="选择宠物种类" subtitle="先告诉我是猫主子还是汪星人～" />
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
              <SpeciesCard
                emoji="🐱"
                label="猫咪"
                selected={species === 'cat'}
                onClick={() => setSpecies('cat')}
              />
              <SpeciesCard
                emoji="🐶"
                label="狗狗"
                selected={species === 'dog'}
                onClick={() => setSpecies('dog')}
              />
            </div>
          </StepCard>

          <StepCard direction={slideDirection}>
            <StepTitle
              emoji={species === 'cat' ? '😺' : '🐕'}
              title={`选择${species === 'cat' ? '猫咪' : '狗狗'}品种`}
              subtitle="选一个最接近的，如果不确定就选其他吧"
            />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {breeds.map((b) => (
                <BreedCard
                  key={b.value}
                  emoji={b.emoji}
                  label={b.label}
                  selected={breed === b.value}
                  onClick={() => setBreed(b.value)}
                />
              ))}
              <BreedCard
                emoji="✨"
                label="其他"
                selected={breed === 'other'}
                onClick={() => setBreed('other')}
              />
            </div>
          </StepCard>

          <StepCard direction={slideDirection}>
            <StepTitle emoji="💝" title="选择宠物性别" subtitle="帮助推荐更贴合的名字风格" />
            <div className="flex justify-center gap-4 flex-wrap">
              <GenderPill
                icon="♂"
                label="公"
                selected={gender === 'male'}
                onClick={() => setGender('male')}
                color="text-sky-500"
              />
              <GenderPill
                icon="♀"
                label="母"
                selected={gender === 'female'}
                onClick={() => setGender('female')}
                color="text-pink-500"
              />
              <GenderPill
                icon="❓"
                label="未知"
                selected={gender === 'unknown'}
                onClick={() => setGender('unknown')}
                color="text-gray-500"
              />
            </div>
          </StepCard>

          <StepCard direction={slideDirection}>
            <StepTitle emoji="🎨" title="毛色与性格" subtitle="可以多选哦，越精准推荐越合适" />
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-brown-500 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  毛色特征
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {COAT_COLORS.map((c) => (
                    <CoatColorButton
                      key={c.value}
                      color={c.colorHEX}
                      label={c.label}
                      selected={coatColors.includes(c.value)}
                      onClick={() => toggleCoatColor(c.value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-brown-500 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  性格特点
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {PERSONALITIES.map((p) => (
                    <PersonalityTag
                      key={p.value}
                      icon={p.icon}
                      label={p.label}
                      selected={personalities.includes(p.value)}
                      onClick={() => togglePersonality(p.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepCard>

          <StepCard direction={slideDirection}>
            <StepTitle emoji="✨" title="名字风格偏好" subtitle="选几个你喜欢的风格方向（可多选）" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {STYLE_PREFERENCES.map((s) => (
                <StyleCard
                  key={s.value}
                  label={s.label}
                  desc={s.desc}
                  selected={stylePreferences.includes(s.value)}
                  onClick={() => toggleStyle(s.value)}
                />
              ))}
            </div>
          </StepCard>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between max-w-3xl mx-auto">
        <div className="w-32">
          {currentStep > 1 ? (
            <NavButton
              variant="secondary"
              onClick={goPrev}
              icon={<ChevronLeft className="w-5 h-5" />}
            >
              上一步
            </NavButton>
          ) : (
            <div />
          )}
        </div>

        <button
          onClick={handleSkip}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline-offset-4 hover:underline"
        >
          跳过问答 →
        </button>

        <div className="w-32 flex justify-end">
          {currentStep < TOTAL_STEPS ? (
            <NavButton
              variant="primary"
              onClick={goNext}
              disabled={!canGoNext}
              icon={<ChevronRight className="w-5 h-5" />}
              iconPosition="right"
            >
              下一步
            </NavButton>
          ) : (
            <NavButton
              variant="primary"
              onClick={handleComplete}
              icon={<Sparkles className="w-5 h-5" />}
              iconPosition="right"
            >
              生成名字
            </NavButton>
          )}
        </div>
      </div>
    </div>
  );
}

function StepCard({
  children,
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
}) {
  return (
    <div className="min-w-full shrink-0 px-2 sm:px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}

function StepTitle({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-8">
      <div className="text-4xl mb-3">{emoji}</div>
      <h2 className="text-2xl font-bold text-brown-500 mb-2 font-zcool-kuaile tracking-wide">
        {title}
      </h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function SpeciesCard({
  emoji,
  label,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center py-12 px-6 rounded-2xl border-2 transition-all duration-300',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-lg'
          : 'border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/50 hover:scale-[1.02]'
      )}
    >
      <div className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </div>
      <div
        className={cn(
          'text-xl font-bold transition-colors duration-300',
          selected ? 'text-orange-500' : 'text-brown-500'
        )}
      >
        {label}
      </div>
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center shadow-md">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </button>
  );
}

function BreedCard({
  emoji,
  label,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-200',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-md'
          : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:scale-[1.02]'
      )}
    >
      <div className="text-3xl mb-1">{emoji}</div>
      <div
        className={cn(
          'text-xs font-medium text-center leading-tight',
          selected ? 'text-orange-500' : 'text-brown-500'
        )}
      >
        {label}
      </div>
    </button>
  );
}

function GenderPill({
  icon,
  label,
  selected,
  onClick,
  color,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-8 py-3 rounded-full border-2 text-lg font-bold transition-all duration-200',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-md'
          : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:scale-105'
      )}
    >
      <span className={cn('text-2xl', !selected && color, selected && 'text-orange-500')}>
        {icon}
      </span>
      <span className={cn(selected ? 'text-orange-500' : 'text-brown-500')}>{label}</span>
    </button>
  );
}

function CoatColorButton({
  color,
  label,
  selected,
  onClick,
}: {
  color: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all duration-200',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-md'
          : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:scale-105'
      )}
    >
      <span
        className="w-5 h-5 rounded-full border border-gray-200 shadow-inner"
        style={{ backgroundColor: color }}
      />
      <span
        className={cn(
          'text-sm font-medium',
          selected ? 'text-orange-500' : 'text-brown-500'
        )}
      >
        {label}
      </span>
    </button>
  );
}

function PersonalityTag({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 transition-all duration-200',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-md'
          : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:scale-105'
      )}
    >
      <span className="text-lg">{icon}</span>
      <span
        className={cn(
          'text-sm font-medium',
          selected ? 'text-orange-500' : 'text-brown-500'
        )}
      >
        {label}
      </span>
    </button>
  );
}

function StyleCard({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 min-h-[100px]',
        selected
          ? 'ring-2 ring-orange-400 bg-orange-50 scale-105 border-orange-300 shadow-md'
          : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:scale-[1.02]'
      )}
    >
      <div
        className={cn(
          'text-base font-bold mb-1',
          selected ? 'text-orange-500' : 'text-brown-500'
        )}
      >
        {label}
      </div>
      <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center shadow-sm">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

function NavButton({
  variant,
  onClick,
  disabled,
  icon,
  iconPosition = 'left',
  children,
}: {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}) {
  const base =
    'flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200';
  const primary = cn(
    'bg-orange-400 text-white shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-95',
    disabled && 'bg-gray-200 text-gray-400 shadow-none hover:bg-gray-200 cursor-not-allowed active:scale-100'
  );
  const secondary =
    'bg-white text-brown-500 border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 active:scale-95';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variant === 'primary' ? primary : secondary)}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
}
