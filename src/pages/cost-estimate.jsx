import LoadingSpinner from "@/Components/LoadingSpinner";
import { SvgSPrite } from "@/Components/SvgSPrite";
import TextInput from "@/Components/form/TextInput";
import {
  calculateZoom,
  findBiggerNumber,
  getPathCoordinates,
  numberWithCommas,
} from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { defaultCenter } from "@/constants/Const";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
// Initialize Map
const Map = dynamic(() => import("@/Components/Map"), {
  ssr: false,
});

const COST_ESTIMATE_STEPS = [
  {
    name: "source",
    title: "آدرس مبدأ",
    button: "ثبت مبدأ",
    readOnly: true,
    rules: {
      required: "آدرس مبدأ را وارد کنید",
    },
  },
  {
    name: "destination",
    title: "آدرس مقصد",
    readOnly: true,
    button: "ثبت مقصد",
    rules: {
      required: "آدرس مقصد را وارد کنید",
    },
  },
  {
    name: "container",
    title: "نوع بارگیر",
    button: "ثبت بارگیر",
    readOnly: true,
    rules: {
      required: "نوع بارگیر را وارد کنید",
    },
  },
];

const INITIAL_MAP_STATE = {
  center: defaultCenter,
  zoom: 14,
  arrowDirections: [],
};

const CostEstimate = () => {
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    register,
  } = useForm();

  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);
  // map give this data to us
  const [mapData, setMapData] = useState({});
  //  we give data to map
  const [controlMap, setControlMap] = useState(INITIAL_MAP_STATE);

  // render arrowMarkers if condition true
  useEffect(() => {
    if (step === 2) {
      let sLat = watch("source_lat");
      let sLng = watch("source_lng");
      let dLat = watch("destination_lat");
      let dLng = watch("destination_lng");

      getTimeAndDistance([
        [sLat, sLng],
        [dLat, dLng],
      ]);

      setControlMap({
        center: [(sLat + dLat) / 2, (sLng + dLng) / 2],
        zoom: calculateZoom(findBiggerNumber(sLat - dLat, sLng - dLng)),
        arrowDirections: [[sLat, sLng, dLat, dLng]],
      });
    }
  }, [step]);

  const getTimeAndDistance = async (path) => {
    try {
      const res = await getPathCoordinates(path);
      setPriceEstimate((prev) => ({
        ...prev,
        distance: res?.distance,
        time: res?.time,
      }));
    } catch (error) {}
  };

  // reset form
  const resetToEstimate = () => {
    setControlMap(INITIAL_MAP_STATE);
    reset();
    setStep(0);
    setShowResult(false);
  };

  const onSubmit = async (data) => {
    if (step + 1 === COST_ESTIMATE_STEPS.length) {
      try {
        const res = await simpleAxiosApi({
          url: `/request/get-price?source_lat=${data?.source_lat}&source_lng=${data?.source_lng}&destination_lat=${data?.destination_lat}&destination_lng=${data?.destination_lng}&container_type_id=${data?.container?.id}`,
        });
        setPriceEstimate((prev) => ({ ...prev, ...res.data.Data }));
        setShowResult(true);
      } catch (error) {}
      return;
    }
    setStep((prev) => prev + 1);
  };

  const FormInputs = [
    <MapForm
      input={COST_ESTIMATE_STEPS[step]}
      mapData={mapData}
      register={register}
      errors={errors}
      setValue={setValue}
    />,
    <MapForm
      input={COST_ESTIMATE_STEPS[step]}
      mapData={mapData}
      register={register}
      errors={errors}
      setValue={setValue}
    />,
    <MapVehicleTypeForm
      input={COST_ESTIMATE_STEPS[step]}
      register={register}
      errors={errors}
      setValue={setValue}
      watch={watch}
    />,
  ];

  return (
    <>
      <Head>
        <title> دراپ - تـخـمـیـن بـار </title>
      </Head>

      {showResult ? (
        <ResultCostEstimate
          resetToEstimate={resetToEstimate}
          data={priceEstimate}
        />
      ) : (
        <div className="h-screen">
          <Map
            center={controlMap.center}
            zoom={controlMap.zoom}
            arrowDirections={controlMap.arrowDirections}
            setMapData={setMapData}
            centerMarker={true}
          >
            {/* back button */}
            <div
              role="button"
              className="fixed right-16 top-8 h-14 w-14 rounded-lg bg-white p-4 shadow-md transition-all hover:brightness-95"
              onClick={() => router.back()}
            >
              <SvgSPrite icon="arrow_right" />
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto grid max-w-xl gap-2 rounded-t-lg bg-white p-4 "
              >
                {FormInputs[step]}

                <button
                  className="rounded-md bg-primary-900 py-3 text-center text-base text-white"
                  type="submit"
                >
                  {COST_ESTIMATE_STEPS[step].button}
                </button>
              </form>
            </div>
          </Map>
        </div>
      )}
      {isSubmitting && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex w-full flex-col items-center bg-white/80 pt-10">
          <LoadingSpinner />
          <span className="mt-2"> در حال محاسبه قیمت... </span>
        </div>
      )}
    </>
  );
};

const ResultCostEstimate = ({ resetToEstimate, data }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div className="flex h-screen items-center justify-center bg-white text-center">
      <div className="flex flex-col gap-3">
        <h3 className="mb-8 font-bold text-primary-900">
          نـتـیـجـه تـخـمـیـن بـار
        </h3>

        <div className="grid w-[500px] gap-3 ">
          <div className="mb-6 grid gap-5 rounded-lg border border-solid p-4">
            <div className="flex justify-between">
              <div className="font-bold"> مسافت </div>
              <div>
                {numberWithCommas(Number(data?.distance).toFixed(2))} کیلومتر
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> مدت زمان </div>
              <div>{numberWithCommas(Math.ceil(data?.time))} دقیقه</div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> قیمت حداقل </div>
              <div>{numberWithCommas(data?.low_price)} تومان</div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold"> قیمت حداکثر </div>
              <div>{numberWithCommas(data?.high_price)} تومان</div>
            </div>
          </div>

          <button
            className="rounded-md bg-primary-900 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            className="rounded-md border-2 border-solid border-primary-900 bg-white py-3 font-semibold text-primary-900"
            onClick={resetToEstimate}
          >
            امتحان مجدد
          </button>
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  },
};
const MapVehicleTypeForm = ({ input, register, errors, setValue, watch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [state, setState] = useState({
    items: [],
    hasMore: true,
    page: 1,
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (state.hasMore) {
      fetchData();
    }
  }, [inView]);

  const handleOnClickCard = (item) => {
    setSelected(item);
    setValue(input?.name, item, { shouldValidate: true });
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await simpleAxiosApi({
        url: `/vehicle/type?page=${state.page}`,
      });

      setState((prev) => ({
        hasMore: res.data.Data.last_page > prev.page,
        items: prev.items.concat(res.data.Data.data),
        page: prev.page + 1,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full text-base ">
        <label
          htmlFor={input?.id || input?.name}
          className={`relative block rounded-[5px] border-2 
             p-4 placeholder-slate-700
            ${
              !!errors?.[input.name] ? "border-red-500" : "border-primary-light"
            } 
            ${input?.labelClassName || ""}`}
        >
          <div
            role="button"
            className={` absolute left-3 top-1/2 z-0 flex -translate-y-1/2 transform  items-center 
              justify-center rounded-md bg-primary-dark px-3 py-2 text-xs text-white `}
            onClick={openModal}
          >
            انتخاب بارگیر
          </div>

          <input
            name={input?.name}
            id={input?.id || input?.name}
            placeholder="نوع بارگیر"
            {...register(input.name, {
              ...input.rules,
            })}
            value={watch(input.name)?.title || ""}
            readOnly={true}
            className={`w-full cursor-default ${input?.inputClassName || ""}`}
          />
        </label>
        <div className="mt-1 text-start text-xs text-red-500">
          {errors?.[input.name]?.message}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="react_modal_overlay"
        className="react_modal"
        ariaHideApp={false}
      >
        <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-xl font-bold sm:text-3xl">انتخاب بارگیر</h1>
            <span className="cursor-pointer text-xl hover:text-red-500">X</span>
          </div>
          <div className="max-h-[80vh] overflow-auto">
            <div className="grid grid-cols-4 gap-5 p-3 ">
              {state.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={` w-full cursor-pointer rounded-md border-2 border-solid border-primary-800 p-2 shadow-lg transition-all hover:scale-105
                      ${selected?.id === item.id && "bg-primary-900 text-white"}
                    `}
                    onClick={() => handleOnClickCard(item)}
                  >
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold"> نوع بارگیر: </span>
                        <span className="text-sm font-bold">
                          {" "}
                          {item?.title}{" "}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-bold"> حداکثر وزن: </span>
                        <span className="text-sm font-bold">
                          {" "}
                          {numberWithCommas(item?.max_weight)} کیلوگرم{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {state.hasMore ? (
              isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-3 ">
                  <LoadingSpinner />
                  <div className="text-base">درحال دریافت بیشتر...</div>
                </div>
              ) : (
                <div ref={ref} className="p-2" />
              )
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

const MapForm = ({ input, mapData, register, errors, setValue }) => {
  useEffect(() => {
    if (mapData?.center) {
      setValue(input?.name, mapData?.name, { shouldValidate: true });
      setValue(`${input?.name}_lat`, mapData?.center[0]);
      setValue(`${input?.name}_lng`, mapData?.center[1]);
    }
  }, [mapData?.center]);

  return (
    <TextInput
      placeholder={input.title}
      register={register(input.name, {
        ...input.rules,
      })}
      readOnly={input.readOnly}
      error={errors?.[input.name]}
      inputClassName="text-base"
      key={input.name}
      type="text"
    />
  );
};

export default CostEstimate;
