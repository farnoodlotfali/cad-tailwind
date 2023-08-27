import { useMemo, useRef, useState } from "react";
import { SvgSPrite } from "./SvgSPrite";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { BREAK_POINTS } from "../../constants/Const";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PADDING_LAYOUT } from "@/Layouts/PanelLayout";

const FAQList = () => {
  const [active, setActive] = useState(null);
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);

  const handleToggle = (val) => {
    if (active === val) {
      setActive(null);
    } else {
      setActive(val);
    }
  };

  return (
    <div className={`py-10 ${PADDING_LAYOUT}`}>
      <h3 className="mb-10 text-center font-bold text-primary-700">
        ســوالات مـتـداول
      </h3>

      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-6 flex flex-col gap-5 md:col-span-5">
          {FAQ_ITEMS.map((item, i) => {
            return (
              <AccordionItem
                key={i}
                active={active}
                handleToggle={handleToggle}
                answer={item.answer}
                question={item.question}
              />
            );
          })}
        </div>
        {!isTablet && (
          <div className="col-span-1 ">
            <div className="h-full rounded-lg bg-secondary-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const AccordionItem = ({ active, question, answer, handleToggle }) => {
  const contentEl = useRef(null);

  const { windowWidth } = useWindowWidth(1024);

  const height = useMemo(
    () => contentEl?.current?.scrollHeight,
    [contentEl?.current?.scrollHeight, windowWidth]
  );

  const isOpen = useMemo(() => active === question, [active]);
  return (
    <div className={`rounded-lg border-2 border-solid border-stone-200`}>
      <button
        className={`group  flex w-full cursor-pointer flex-col items-center justify-between rounded-t-lg bg-white px-5 py-4 transition-all sm:flex-row ${
          !isOpen && "rounded-b-lg duration-1000"
        }`}
        onClick={() => handleToggle(question)}
      >
        <h4 className=" m-0 mb-2 text-lg font-medium sm:mb-0 md:text-inherit">
          {question}
        </h4>
        <div
          className={` ${
            isOpen ? " -rotate-180" : ""
          } bg-transparent transition-all duration-500`}
        >
          <span className="m-auto flex">
            <SvgSPrite icon="chevron_down" size="small" />
          </span>
        </div>
      </button>
      <div
        className={` ${
          isOpen ? " h-auto" : "h-0 "
        }  relative overflow-hidden rounded-b-lg bg-white transition-all duration-500`}
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentEl} className="px-5 pb-5 pt-1">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ_ITEMS = [
  {
    question: "فرآیند ثبت‌نام در چادرملو به عنوان “راننده” چگونه است؟",
    answer: "عالی",
  },
  {
    question: "کارمزد بار چگونه محاسبه می‌شود؟",
    answer: "عالی",
  },
  {
    question: "مزیت اصلی سامانه شما چه چیزی است؟",
    answer: "عالی",
  },
  {
    question:
      "نسخه اندروید گوشی من پایین هست، آیا این اپلیکیشن روی اون نصب میشه؟",
    answer: "عالی",
  },
  {
    question: "نقش کیف‌پول در اپلیکیشن چیه؟",
    answer: "عالی",
  },
  {
    question: "فرآیند ثبت‌نام در چادرملو به عنوان “صاحب‌بار” چگونه است؟",
    answer: "عالی",
  },
];

export default FAQList;
