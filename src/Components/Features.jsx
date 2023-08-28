import { PADDING_LAYOUT } from "@/Layouts/PanelLayout";
import { SvgSPrite } from "./SvgSPrite";
import { enToFaNumber } from "@/Utility/utils";

const FEATURES_ITEMS = [
  {
    icon: "semi_truck",
    title: enToFaNumber("25,000+ ناوگان"),
    text: enToFaNumber(
      "چادرملو با دسترسی به بیش از 25 هزار ناوگان به عنوان بزرگترین سامانه هوشمند حمل و نقل بار حمل و نقل در کشور است."
    ),
  },
  {
    icon: "internet",
    title: "اعلام بار اینترنتی",
    text: "صاحبان کالا باربری‌ها و متصدیان حمل بار در هرزمان و مکان میتوانند در سامانه اعلام بار چادرملو، ایران پاسخگوی طیف وسیعی از نیازهای صنعت ثبت بار کنند.",
  },
  {
    icon: "shield_check",
    title: "تضمین امنیت کالا",
    text: "چادرملو با ارائه بارنامه و بیمه کامل بار همکاری با رانندگان حرفهای تامین ناوگان سالم و ارائه خدمات پشتیبانی قوی سلامت و امنیت محموله های ارسالی را تضمین می‌کند",
  },
  {
    icon: "container_truck",
    title: "مدیریت حمل بار",
    text: "پنل هوشمند مدیریت به صاحبان کالا متصدیان و شرکت‌های ،باربری در تسهیل و تسریع روند حمل و نقل و مدیریت کالا کمک می‌کند.",
  },
  {
    icon: "two_tickets",
    title: "نوبت‌گیری اینترنتی",
    text: "امکان را برای رانندگان فراهم کرده تا بتوانند با انتخاب یک بار همزمان بار مسیر برگشت و یا مبدا دلخواه خود را رزرو کنند.",
  },
  {
    icon: "dollar_coin",
    title: "مقرون به صرفه",
    text: "چادرملو با هدف توسعه صنعت حمل و حفظ حقوق کلیه ذینفعان با فراهم نمودن دسترسی رایگان به سامانه ثبت و اعلام بار و حذف هزینه های اضافی هم به افزایش درآمد رانندگان و..",
  },
];

const Features = () => {
  return (
    <div className={`py-10 ${PADDING_LAYOUT}`}>
      <h3 className="py-12 text-center text-3.2xl font-bold text-primary-700">
        ویــژگــی‌هــا
      </h3>
      <div className=" flex flex-wrap justify-center gap-5">
        {FEATURES_ITEMS.map((item, i) => {
          return (
            <div
              key={i}
              className="group flex w-full flex-col items-center justify-center gap-3 rounded-card-border bg-white p-10 text-center transition-all hover:bg-primary-700 md:w-4/10 lg:w-3/10"
            >
              <div className="flex w-fit rounded-full bg-primary-light p-4 group-hover:bg-primary-dark">
                <SvgSPrite
                  icon={item.icon}
                  size="extraLarge"
                  className="fill-primary-700 group-hover:fill-white "
                />
              </div>
              <h4 className="font-bold group-hover:text-white">{item.title}</h4>
              <p className="text-[#666D85] group-hover:text-[#DCDFEB]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
