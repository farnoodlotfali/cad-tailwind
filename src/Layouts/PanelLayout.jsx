import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BREAK_POINTS } from "../../constants/Const";
import { useRouter } from "next/router";
import { SvgSPrite } from "@/Components/SvgSPrite";

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
                    className="text-xl font-semibold text-primary-700 hover:underline"
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

            <div className="flex items-center justify-between">
              <Link href="/" prefetch={false} className="flex ">
                <Image
                  src="./chador_logo_colored.svg"
                  width={40}
                  height={40}
                  alt="chador_logo"
                />
              </Link>

              <div className=" min-h-[30px] w-[2px] bg-primary-400 " />

              <Link href="/" prefetch={false} className="flex ">
                <h1 className="text-xl font-bold text-primary-700">چادرملو</h1>
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
        isTransparent ? "text-white" : "text-primary-700"
      }`}
    >
      <div
        className={`flex items-center justify-between py-6 ${PADDING_LAYOUT}`}
      >
        <div className="flex items-center gap-x-4">
          <Link href="/" prefetch={false} style={{ display: "flex" }}>
            <Image
              src={
                isTransparent
                  ? "./chador_logo.svg"
                  : "./chador_logo_colored.svg"
              }
              width={40}
              height={40}
              alt="chador_logo"
            />
          </Link>
          <div className=" bg-gray-400 md:h-10 md:w-[1px] " />
          <h1 className="whitespace-nowrap text-xl font-bold ">چـادرمـلـو</h1>
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
          <div className="flex justify-between gap-x-10">
            {HEADER_LINKS.map((li) => {
              return (
                <Link
                  className="font-semibold hover:underline"
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

const Footer = () => {
  return (
    <footer className={`bg-secondary-900 p-10 ${PADDING_LAYOUT}`}>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <div className="w-full">
          <Image
            src={"./chador_logo.svg"}
            alt="chador_logo"
            width={160}
            height={160}
            title="chador_logo"
            className="mx-auto md:mx-0"
          />
        </div>

        <div className="flex w-full justify-around text-center">
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/faq" prefetch={false}>
              سوالات متداول
            </Link>
            <Link href="/privacy" prefetch={false}>
              قوانین و مقررات
            </Link>
          </div>
          <div className=" flex flex-col gap-7 text-white">
            <Link href="/about" prefetch={false}>
              درباره‌ما
            </Link>
            <Link href="/contact" prefetch={false}>
              تماس با ما
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-end ">
          <div className=" rounded-lg bg-white p-4 ">
            <Image
              src={"./Assets/images/namad.svg"}
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
          تمامی حقوق به شرکت <strong>چادرملو</strong> تعلق دارد
        </h5>

        <a href="mailto:info@chadormalu.com">info@chadormalu.com</a>
      </div>
    </footer>
  );
};

export default PanelLayout;
