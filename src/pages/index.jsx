import Image from "next/image";
import { SvgSPrite } from "@/Components/SvgSPrite";
import { BREAK_POINTS } from "../../constants/Const";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DownloadButton from "@/Components/DownloadButton";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import Features from "@/Components/Features";
import Head from "next/head";
import FAQList from "@/Components/FAQList";
import PanelLayout, { PADDING_LAYOUT } from "@/Layouts/PanelLayout";

// paddding= p-10

const HERO_SLIDES = [
  {
    img: "customerApp.svg",
    title: "صاحب بار",
    color: "primary",
    bgColor: "bg-primary-700",
  },
  {
    img: "driverApp.svg",
    title: "رانـنـده",
    color: "secondary",
    bgColor: "bg-secondary-900",
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);

  return (
    <>
      <Head>
        <title> چادرملو - صفحه اصلی</title>
      </Head>

      <div className="min-h-screen">
        {/*  */}
        <div className={`relative `}>
          <Swiper
            slidesPerView={1}
            dir="rtl"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            onSlideChange={(e) => setActiveSlide(e.realIndex)}
            onSwiper={(e) => setActiveSlide(e.realIndex)}
            className="h-[600px] "
          >
            {HERO_SLIDES.map((item) => {
              return (
                <SwiperSlide key={item.title}>
                  <div
                    className={`grid grid-cols-12 items-center gap-4 ${item.bgColor} h-full py-10 pt-28 text-white ${PADDING_LAYOUT}`}
                  >
                    <div className="col-span-12 flex flex-col gap-3 text-center md:col-span-5 md:text-justify">
                      <h1 className="md:text-align-last-justify font-extrabold">
                        یه تیتر جذاب و چند کلمه‌ای
                      </h1>
                      <h4 className="text-base md:text-inherit">
                        توضیح کوتاه و مختصر در مورد تیتر و ترغیب برای کلیک بر
                        روی دکمه و دعوت به اقدام
                      </h4>
                      <DownloadButton
                        label={`دانلود اپ ${item.title}`}
                        className="mx-auto mt-2 w-fit py-3 md:mx-0 md:mt-5 "
                        color={item.color}
                      />
                    </div>
                    <div className="relative col-span-12 h-72 md:col-span-6 md:col-start-7 md:h-full">
                      <Image
                        src={`./Assets/images/${item.img}`}
                        fill
                        priority
                        title="Mobile App Screens"
                        alt="mobile app screens"
                        className="mx-auto !w-fit md:mx-0 md:mr-auto"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <AboutApp />

        <Features />

        <AppMobileScreens />

        <FAQList />

        <CostEstimateSec />
      </div>
    </>
  );
};

const AboutApp = () => {
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  return (
    <div
      className={`bg-white bg-pattern bg-cover bg-center bg-no-repeat py-10 ${PADDING_LAYOUT}`}
    >
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5 ">
        <h2 className="whitespace-nowrap font-bold text-primary-700">
          دربـاره چـادرمـلـو
        </h2>
        <div className=" bg-primary-400 md:h-28 md:w-[2px] " />
        <p className="text-justify leading-8 md:leading-7">
          شرکت معدنی و صنعتی چادرملو در خرداد ماه 1371 تحت شماره 2257 در دفتر
          ثبت شرکتهای شهرستان یزد به ثبت رسیده است. سپس به موجب مصوبه مجمع عمومی
          فوق العاده مورخ 16/8/1377 مرکز شرکت به تهران منتقل و به شماره 145857
          در اداره کل ثبت شرکتها و موسسات غیر تجاری تهران به ثبت رسیده است.{" "}
          <br /> دفتر مرکزی شرکت در تهران، خیابان ولیعصر بالاتر از ظفر، بلوار
          اسفندیار، پلاک 66 واقع است و شرکت فاقد شعبه می باشد. مجتمع معدنی و
          صنعتی چادرملو در استان یزد، 180 کیلومتری شمال شرقی شهر یزد، حاشیه کویر
          ساغند قرار دارد.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-white md:grid-cols-2">
        <div className="rounded-card-border bg-primary-700 p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {!isTablet && <SvgSPrite icon="cardboard_box" size="large" />}
              <h4 className="font-bold">صــاحـب بــار</h4>
            </div>
            <div className="order-3 flex justify-center md:order-2 md:justify-end">
              <DownloadButton label={"دانلود اپ صاحب بار"} />
            </div>
            <div className="order-2 md:order-3 md:col-span-2">
              <div className=" text-justify" role="p">
                تجار، بازرگانان ترخیص کاران ،کارخانجات واحدهای صنعتی و تولیدی
                معادن شرکتها، سازمانها و اشخاص میتوانند در سامانه حمل بار
                بارستان کلیه محموله های خود را به راحتی با بهترین قیمت و در
                کوتاه‌ترین زمان ممکن در سراسر کشور ارسال و دریافت کنند.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card-border bg-secondary-900 p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {!isTablet && <SvgSPrite icon="steering_wheel" size="large" />}
              <h4 className=" font-bold">رانــنــده</h4>
            </div>
            <div className="order-3 flex justify-center md:order-2 md:justify-end">
              <DownloadButton label={"دانلود اپ راننده"} color="secondary" />
            </div>
            <div className="order-2 md:order-3 md:col-span-2">
              <div className=" text-justify" role="p">
                رانندگان کامیون تریلی و کلیه ماشینهای سنگین با استفاده از
                اپلیکیشن در هر زمان و هر مکان میتوانند از میان هزاران بار اعلام
                شده در سراسر ایران مسیر دلخواه و محموله مناسب با کامیون خود را
                انتخاب کنند.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppMobileScreens = () => {
  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);
  return (
    <div className={`bg-white py-10 ${PADDING_LAYOUT}`}>
      <h3 className="mb-10 text-center font-bold text-primary-700">
        بـخـش‌هـای اپـلـیـکـیـشـن
      </h3>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div
            className=" relative h-full overflow-hidden rounded-card-border bg-primary-700
      px-6 pt-6 text-white before:absolute before:bottom-[-170px] before:right-[-125px] 
      before:h-[300px] before:w-[300px] before:rounded-full before:border-[60px] before:border-solid
       before:border-primary-600 "
          >
            <div className="relative z-10 h-full">
              <div className="float-right flex flex-col gap-4">
                <h5 className="text-center text-2xl font-bold md:text-start md:text-4xl">
                  ثبت آگهی {!isTablet && <br />} راحت و سریع!
                </h5>
                <div className="mb-3 h-fit w-fit self-center rounded bg-primary-dark px-2 py-1 md:mb-0 md:self-end">
                  صاحب بار
                </div>
              </div>
              <div className="relative float-left flex h-full items-baseline ">
                <Image
                  src="./Assets/images/Ad.svg"
                  width={280}
                  height={400}
                  alt="Ad"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div
            className=" relative h-full overflow-hidden rounded-card-border bg-gray-50
      px-6 before:absolute before:bottom-[-190px] before:right-[-162px] before:top-auto
      before:h-full before:w-[300px] before:rounded-full before:border-[60px]
      before:border-solid before:border-stone-200 md:before:bottom-0 md:before:right-[-162px]
      md:before:top-0 "
          >
            <div className="relative z-10 mr-auto flex h-full w-full flex-col-reverse items-center justify-between gap-4 md:w-4/5 md:flex-row ">
              <h5 className="float-none flex flex-wrap justify-center whitespace-nowrap pt-3 text-center text-2xl font-bold xs:w-full md:float-right md:w-48 md:text-start md:text-4xl">
                <span>هـرلـحـظه از </span>
                <span> وضعیت بـار </span>
                <span>بـاخـبـر باش </span>
              </h5>
              <div className="relative float-none h-full md:float-left">
                <Image
                  src="./Assets/images/loan.svg"
                  width={400}
                  height={100}
                  className="h-full"
                  alt="loan"
                />
              </div>
            </div>
          </div>
          {/* <div
            className=" relative h-full overflow-hidden rounded-card-border bg-gray-50
      px-6 pt-6  before:absolute before:bottom-auto before:left-[-162px] before:right-auto before:top-[-190px]
       before:h-full before:w-[300px] before:rounded-full before:border-[60px]
      before:border-solid before:border-stone-200 md:before:bottom-0 md:before:left-auto md:before:right-[-162px]
       md:before:top-0 "
          >
            <div className="relative z-10 mr-auto flex h-full w-full flex-col flex-wrap items-center justify-center md:w-4/5 md:flex-row md:justify-between ">
              <h5 className="float-none flex flex-wrap justify-center text-center text-2xl font-bold xs:w-full md:float-right md:w-48 md:text-start md:text-4xl ">
                <span>هـرلـحـظه از </span>
                <span> وضعیت بـار </span>
                <span>بـاخـبـر باش </span>
              </h5>
              <div className="relative float-none mt-auto md:float-left ">
                <Image
                  src="./Assets/images/loan.svg"
                  width={400}
                  height={1}
                  alt="loan"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-12 gap-5">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-7">
          <div
            className=" relative h-full overflow-hidden rounded-card-border bg-gray-50
      px-6 before:absolute before:bottom-[-190px] before:left-[-162px] before:top-auto
      before:h-full before:w-[300px] before:rounded-full before:border-[60px]
      before:border-solid before:border-stone-200 md:before:bottom-0 md:before:left-[-162px]
      md:before:top-0 "
          >
            <div className="relative z-10 ml-auto flex h-full w-full flex-col-reverse items-center justify-between gap-4 md:w-4/5 md:flex-row ">
              <div className="relative float-none h-full md:float-left">
                <Image
                  src="./Assets/images/screen2.svg"
                  width={400}
                  height={100}
                  className="h-full"
                  alt="screen2"
                />
              </div>
              <h5 className="float-none flex flex-wrap justify-center whitespace-nowrap pt-3 text-center text-2xl font-bold xs:w-full md:float-right md:w-48 md:text-start md:text-4xl">
                <span> دیگه نگران </span>
                <span> پـیـداشـدن </span>
                <span> بـــار نـبـاش </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="order-1 col-span-12 lg:order-2 lg:col-span-5">
          <div
            className=" relative h-full overflow-hidden rounded-card-border bg-secondary-900
      px-6 pt-6 text-white before:absolute before:right-[-125px] before:top-[-170px] 
      before:h-[300px] before:w-[300px] before:rounded-full before:border-[60px] before:border-solid
       before:border-secondary-800 "
          >
            <div className="relative z-10 flex justify-between gap-3">
              <div className="float-right flex flex-col justify-end gap-4 pb-5">
                <div className="mb-3 h-fit w-fit self-center rounded bg-secondary-dark px-2 py-1 md:mb-0 md:self-end">
                  رانـنـده
                </div>
                <h5 className="text-center text-2xl font-bold md:text-start md:text-4xl">
                  اطلاعات کامل{!isTablet && <br />} و بـدون نقـص
                </h5>
              </div>
              <div className="relative float-left mt-auto">
                <Image
                  src="./Assets/images/screen3.svg"
                  width={250}
                  height={400}
                  alt="screen3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CostEstimateSec = () => {
  return (
    <div
      className={`
          relative flex items-center overflow-hidden bg-primary-700 py-16 text-white
          before:absolute before:left-[-100px] before:top-[-100px] before:h-[200px] before:w-[200px] before:rounded-full before:border-[40px] before:border-solid before:border-primary-600 
          after:absolute after:bottom-[-125px] after:right-[-100px] after:h-[200px] after:w-[200px] after:rounded-full after:border-[40px] after:border-solid after:border-primary-600
          ${PADDING_LAYOUT}
      `}
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-between gap-5  text-center md:flex-row md:text-start">
        <div className="">
          <h4 className="mb-2 text-3xl font-bold">
            هنوز برای استفاده از چـادرمـلـو تردید داریــد؟!
          </h4>
          <h6 className="text-xl font-light">
            شما می‌تـوانید با مشخص کردن مبدا و مقصد و وزن بار خود تخمین هزینه
            چـادرمـلـو را در لحظه مشاهده کنید.
          </h6>
        </div>

        <Link prefetch={false} href="/cost-estimate">
          <div
            role="button"
            className="h-fit w-40 whitespace-nowrap rounded bg-primary-dark p-3 text-center"
          >
            تخمین هزینه بار
          </div>
        </Link>
      </div>
    </div>
  );
};

Home.PageLayout = PanelLayout;
export default Home;
