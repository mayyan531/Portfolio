
import { FiCheck, FiSearch } from 'react-icons/fi'
import { GiPartyPopper } from 'react-icons/gi'

interface Props {
  foundImages: {
    smiskiFound: boolean;
    berryFound: boolean;
    watermelonFound: boolean;
  };
}

export default function Challenge({ foundImages }: Props) {
  const clues = [
    { label: 'Smiski On a Laptop', found: foundImages.smiskiFound },
    { label: 'Berry twice', found: foundImages.berryFound },
    { label: 'Odd Coloured Element', found: foundImages.watermelonFound }
  ]

  const count = clues.filter(clue => clue.found).length
  const complete = count === 3
  const progress = ['w-0', 'w-1/3', 'w-2/3', 'w-full']

  return (
    <div className="relative flex h-full w-full flex-col justify-center rounded-[28px] border border-navy-blue/15 bg-cream/60 p-7 font-inter text-navy-blue shadow-[0_15px_45px_rgba(10,31,49,0.08)] backdrop-blur-md sm:p-8">

      <div className="mb-6 flex items-center gap-2 text-navy-blue/60">
        <FiSearch size={17} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">A Little Challenge</span>
      </div>

      <h2 className="font-inter text-[clamp(1.8rem,3vw,2.6rem)] font-bold italic leading-tight tracking-tight">
        I spy with my little eye<span className="text-blue">...</span>
      </h2>

      <p className="mt-4 text-[14px] leading-relaxed text-navy-blue/70">
        Three hidden images are scattered across my portfolio, try to find them all!
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {clues.map((clue, index) => (
          <div key={clue.label} className="flex items-center justify-between rounded-xl border border-navy-blue/10 bg-white/40 px-4 py-3 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-navy-blue/40">0{index + 1}</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em]">{clue.label}</span>
            </div>

            <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${clue.found ? 'border-navy-blue bg-navy-blue text-cream' : 'border-navy-blue/20 text-navy-blue/30'}`}>
              {clue.found ? <FiCheck size={15} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] font-medium text-navy-blue/60">{complete ? 'All found!' : 'Keep exploring!'}</span>
          <span className="text-[12px] font-semibold">{count}/3</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-blue/10">
          <div className={`h-full rounded-full bg-blue transition-all duration-700 ${progress[count]}`} />
        </div>

        {complete && (
          <div className="mt-5 flex items-center gap-3 text-[13px] font-semibold">
            <GiPartyPopper size={24} />
            You found everything!
          </div>
        )}
      </div>

    </div>
  )
}
