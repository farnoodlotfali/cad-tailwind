import { SvgSPrite } from "@/Components/SvgSPrite";
import TextInput from "@/Components/form/TextInput";
import { numberWithCommas } from "@/Utility/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

// Initialize Map
const Map = dynamic(() => import("@/Components/Map"), {
  ssr: false,
});

const COST_ESTIMATE_STEPS = [
  {
    name: "source",
    title: "آدرس مبدأ",
    button: "ثبت مبدأ",
  },
  {
    name: "destination",
    title: "آدرس مقصد",
    button: "ثبت مقصد",
  },
  {
    name: "container",
    title: "نوع بارگیر",
    button: "ثبت بارگیر",
  },
];

const CostEstimate = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  const handleStep = () => {
    setStep((prev) => {
      let idx = prev + 1;

      if (idx === COST_ESTIMATE_STEPS.length) {
        setShow(true);
        return;
        // return 0;
      }

      return idx;
    });
  };

  const resetToEstimate = () => {
    setStep(0);
    setShow(false);
  };

  return (
    <>
      <Head>
        <title> چادرملو - تـخـمـیـن بـار </title>
      </Head>

      {show ? (
        <ResultCostEstimate resetToEstimate={resetToEstimate} />
      ) : (
        <div className="h-screen">
          <Map zoom={15}>
            {/* back button */}
            <div
              role="button"
              className="fixed right-16 top-8 h-14 w-14 rounded-lg bg-white p-4 shadow-md transition-all hover:brightness-95"
              onClick={() => router.back()}
            >
              <SvgSPrite icon="arrow_right" />
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-10">
              <div className="mx-auto grid max-w-xl gap-2 rounded-t-lg bg-white p-4 ">
                <TextInput
                  placeholder={COST_ESTIMATE_STEPS[step].title}
                  // {...register(input.name, { ...input.rules })}
                  // error={!!errors?.[input.name]}
                  inputClassName="text-base"
                />

                <button
                  className="rounded-md bg-primary-700 py-3 text-center text-base text-white"
                  onClick={handleStep}
                >
                  {COST_ESTIMATE_STEPS[step].button}
                </button>
              </div>
            </div>
          </Map>
        </div>
      )}
    </>
  );
};

const ResultCostEstimate = ({ resetToEstimate }) => {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center bg-white text-center">
      <div className="flex flex-col gap-3">
        <h3 className="mb-8 font-bold text-primary-700">
          نـتـیـجـه تـخـمـیـن بـار
        </h3>

        <div className="grid w-[500px] gap-3 ">
          <div className="mb-6 grid gap-5 rounded-lg border border-solid p-4">
            <div className="flex justify-between">
              <div className="font-bold">مسافت</div>
              <div>{numberWithCommas("1201")} کیلومتر</div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold">مدت زمان</div>
              <div>
                {numberWithCommas("1201")} {numberWithCommas("50")}
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold">هزینه بار</div>
              <div> {numberWithCommas("5541000")} تومان</div>
            </div>
          </div>

          <button
            className="rounded-md bg-primary-700 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            className="rounded-md border-2 border-solid border-primary-700 bg-white py-3 font-semibold text-primary-700"
            onClick={resetToEstimate}
          >
            امتحان مجدد
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostEstimate;
