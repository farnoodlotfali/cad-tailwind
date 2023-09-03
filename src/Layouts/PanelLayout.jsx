import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BREAK_POINTS } from "../constants/Const";
import { useRouter } from "next/router";
import { SvgSPrite } from "@/Components/SvgSPrite";
import LogoApp from "@/Components/LogoApp";

export const PADDING_LAYOUT = "px-8 md:px-16 lg:px-24";

const PanelLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  return (
    <div className="min-h-screen">
      <Header toggleDrawer={toggleDrawer} />
      {children}
      <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <Footer />
    </div>
  );
};

const DRAWER_LINKS = [
  {
    title: "صفحه اصلی",
    link: "/",
  },
  {
    title: "سوالات متداول",
    link: "/faq",
  },
  {
    title: "قوانین و مقررات",
    link: "/privacy",
  },
  {
    title: "درباره‌ما",
    link: "/about",
  },
  {
    title: "تماس باما",
    link: "/contact",
  },
];

const Drawer = ({ openDrawer, toggleDrawer }) => {
  return (
    <div
      className={`${
        openDrawer ? "" : "pointer-events-none  opacity-0 "
      }  modal fixed  left-0 top-0 z-50 flex h-full w-full items-center justify-center transition-all`}
    >
      <div
        onClick={() => {
          toggleDrawer();
        }}
        className="modal-overlay fixed h-full w-full bg-gray-900 opacity-50"
      ></div>

      <div
        className={`fixed left-0 top-0 z-20 h-full w-64 -translate-x-full transform 
        bg-white shadow-lg transition-all duration-500 ${
          openDrawer ? "translate-x-0" : ""
        }
      `}
      >
        <div className="h-full px-6 py-10">
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-10 text-end">
              {DRAWER_LINKS.map((item) => {
                return (
                  <Link
                    className="text-xl font-semibold text-primary-900 hover:underline"
                    prefetch={false}
                    href={item.link}
                    key={item.link}
                    onClick={toggleDrawer}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-around">
              <Link href="/" prefetch={false} className="flex ">
                <div className="h-12 w-12">
                  <LogoApp className="text-primary-900" />
                </div>
              </Link>

              <div className=" min-h-[30px] w-[2px] bg-primary-400 " />

              <Link href="/" prefetch={false} className="flex ">
                <h1 className="text-xl font-bold text-primary-900">دراپ</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HEADER_LINKS = [
  {
    title: "سوالات متداول",
    link: "/faq",
  },
  {
    title: "قوانین و مقررات",
    link: "/privacy",
  },
  {
    title: "درباره‌ما",
    link: "/about",
  },
  {
    title: "تماس باما",
    link: "/contact",
  },
];

const TRANSPARENT_HEADER_ROUTES = ["/"];

const Header = ({ toggleDrawer }) => {
  const router = useRouter();

  const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.md})`);

  const isTransparent = useMemo(() => {
    return TRANSPARENT_HEADER_ROUTES.includes(router.pathname);
  }, [router.pathname]);

  return (
    <header
      className={`absolute left-0 right-0 top-0 z-10 w-full bg-transparent ${
        isTransparent ? "text-white" : "text-primary-900"
      }`}
    >
      <div
        className={`flex items-center justify-between py-6 ${PADDING_LAYOUT}`}
      >
        <div className="flex items-center gap-x-4">
          <Link href="/" prefetch={false} style={{ display: "flex" }}>
            <div className="h-10 w-10">
              {isTransparent ? (
                <LogoApp className="text-white" />
              ) : (
                <LogoApp className="text-primary-900" />
              )}
            </div>
          </Link>
          <div className=" h-4 w-[1px] bg-gray-400 md:h-7 " />
          <Link href="/" prefetch={false}>
            <h1 className="whitespace-nowrap text-xl font-bold ">دراپ</h1>
          </Link>
        </div>
        {isTablet ? (
          <div className="">
            <SvgSPrite
              icon="menu"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex justify-between gap-x-5">
            {HEADER_LINKS.map((li) => {
              return (
                <Link
                  className="rounded-md px-3 py-2 font-semibold hover:bg-[#00000033] "
                  href={li.link}
                  key={li.link}
                  prefetch={false}
                >
                  {li.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

const FOOTER_LINK_HOVER =
  "hover:bg-[#00000033] px-3 py-2 rounded-md transition-all";

const Footer = () => {
  return (
    <footer className={`bg-primary-dark p-10 ${PADDING_LAYOUT}`}>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <div className="w-full">
          <Image
            src={"./drop_logo.svg"}
            alt="drop_logo"
            width={250}
            height={250}
            title="drop_logo"
            className="mx-auto md:mx-0"
          />
        </div>

        <div className="flex w-full justify-around text-center whitespace-nowrap">
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/faq" prefetch={false} className={FOOTER_LINK_HOVER}>
              سوالات متداول
            </Link>
            <Link
              href="/privacy"
              prefetch={false}
              className={FOOTER_LINK_HOVER}
            >
              قوانین و مقررات
            </Link>
          </div>
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/about" prefetch={false} className={FOOTER_LINK_HOVER}>
              درباره‌ما
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className={FOOTER_LINK_HOVER}
            >
              تماس با ما
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-end ">
          <div className=" rounded-lg bg-white p-4 ">
            <Image
              src={"/Assets/images/namad.png"}
              alt="namad"
              width={300}
              height={160}
              title="namad"
            />
          </div>
        </div>
      </div>

      <hr className="my-5 border-gray-500" />

      <div className="flex flex-col items-center justify-between gap-5 text-center text-white md:flex-row md:text-start">
        <h5 className="">
          تمامی حقوق به شرکت <strong>سریر لجستیک</strong> تعلق دارد
        </h5>

        <a href="mailto:info@droproad.ir">info@droproad.ir</a>
      </div>
    </footer>
  );
};

export default PanelLayout;
