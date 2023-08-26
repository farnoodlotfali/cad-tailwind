import { SvgSPrite } from "@/Components/SvgSPrite";
import { PAGE_PADDING } from "@/MUI/theme";
import { AppContext } from "@/context/AppContext";
import { useDevicesSize } from "@/hooks/useDevicesSize";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Toolbar,
  Drawer as MuiDrawer,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const PanelLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header toggleDrawer={toggleDrawer} />
      {children}
      <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <Footer />
    </Box>
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

const HEADER_VARIANT_TITLE = {
  secondary: "رانـنـده",
  primary: "صاحب بار",
};

const Header = ({ toggleDrawer }) => {
  const { headerColor } = useContext(AppContext);
  const { isTablet, isMobile } = useDevicesSize();
  const { pathname } = useRouter();

  const isHome = pathname === "/";

  return (
    <AppBar
      position="static"
      color={headerColor}
      sx={{
        py: 3,
        bgcolor: isHome ? `${headerColor}.main` : "background.paper",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Stack
              direction="row"
              spacing={2}
              color={isHome ? "common.white" : "primary.main"}
              alignItems="center"
            >
              <Link href="/" prefetch={false}>
                <Image
                  src={
                    isHome ? "./chador_logo.svg" : "./chador_logo_colored.svg"
                  }
                  width={isMobile ? 50 : 30}
                  height={isMobile ? 50 : 30}
                />
              </Link>

              <Divider
                sx={{
                  borderColor: "grey.400",
                  borderWidth: 1,
                  height: 40,
                  my: "auto !important",
                }}
                orientation="vertical"
                flexItem
              />

              <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={{ sm: 2, xs: 1 }}
                alignItems="center"
              >
                <Typography
                  fontWeight={700}
                  component="h1"
                  variant="h6"
                  fontSize={{ md: 18, xs: 12 }}
                >
                  چادرملو
                </Typography>

                {isHome && (
                  <Box
                    sx={{
                      bgcolor: `${headerColor}.dark`,
                      py: 1,
                      px: { sm: 1.5, xs: 1 },
                      borderRadius: 2,
                      height: "fit-content",
                      width: "fit-content",
                      float: "right",
                      mt: 1,
                      fontSize: { md: 16, xs: 10 },
                    }}
                  >
                    {HEADER_VARIANT_TITLE[headerColor]}
                  </Box>
                )}
              </Stack>
            </Stack>

            {isTablet ? (
              <Stack direction="row" spacing={3}>
                {HEADER_LINKS.map((page) => (
                  <Link key={page.link} href={page.link} prefetch={false}>
                    <Typography
                      sx={{
                        color: isHome ? "white" : "primary.main",
                        fontWeight: 600,
                        ":hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {page.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            ) : (
              <IconButton size="large" color="inherit" onClick={toggleDrawer}>
                <SvgSPrite icon="bars" color="inherit" />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Drawer = ({ toggleDrawer, openDrawer }) => {
  return (
    <MuiDrawer anchor={"left"} open={openDrawer} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 250,
          p: 3,
          height: "100%",
        }}
      >
        <Stack justifyContent="space-between" height="100%">
          <Stack flexGrow={1} spacing={3}>
            <Link href={"/"} prefetch={false}>
              <Typography color="primary.main" fontWeight={600}>
                صفحه اصلی
              </Typography>
            </Link>
            {HEADER_LINKS.map((li) => {
              return (
                <Link href={li.link} key={li.link} prefetch={false}>
                  <Typography color="primary.main" fontWeight={600}>
                    {li.title}
                  </Typography>
                </Link>
              );
            })}
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Link href="/" prefetch={false} style={{ display: "flex" }}>
              <Image src="./chador_logo_colored.svg" width={40} height={40} />
            </Link>

            <Divider
              sx={{
                borderColor: "grey.400",
                borderWidth: 1,
                height: 40,
                my: "auto !important",
              }}
              orientation="vertical"
              flexItem
            />

            <Typography
              fontWeight={700}
              component="h1"
              variant="h6"
              color="primary.main"
            >
              چادرملو
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </MuiDrawer>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      p={PAGE_PADDING}
      bgcolor="secondary.main"
      color="common.white"
    >
      <Grid
        container
        spacing={4}
        justifyContent={{ md: "space-between", xs: "center" }}
        alignItems="center"
      >
        <Grid item xs={"auto"}>
          <Box>
            <Image
              src={"./chador_logo.svg"}
              alt={"mobiles"}
              width={160}
              height={160}
              priority={true}
              title={"mobiles"}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Link href="/faq" prefetch={false}>
              سوالات متداول
            </Link>
            <Link href="/about" prefetch={false}>
              درباره‌ما
            </Link>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            mt={5}
          >
            <Link href="/privacy" prefetch={false}>
              قوانین و مقررات
            </Link>
            <Link href="/contact" prefetch={false}>
              تماس با ما
            </Link>
          </Stack>
        </Grid>
        <Grid item md={"auto"} xs={12}>
          <Box display="flex" gap={2} bgcolor="common.white" p={2}>
            <Image
              src={"./vercel.svg"}
              alt={"mobiles"}
              width={100}
              height={100}
              priority={true}
              title={"mobiles"}
            />
            <Image
              src={"./vercel.svg"}
              alt={"mobiles"}
              width={100}
              height={100}
              priority={true}
              title={"mobiles"}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ borderColor: "grey.600" }} />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ sm: "row", xs: "column" }}
            justifyContent="space-between"
            spacing={2}
            textAlign={{ sm: "inherit", xs: "center" }}
          >
            <Typography fontWeight={300}>
              تمامی حقوق به شرکت <strong>چادرملو</strong> تعلق دارد
            </Typography>
            <Typography component="a" href="mailto:info@chadormalu.com">
              info@chadormalu.com
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PanelLayout;
