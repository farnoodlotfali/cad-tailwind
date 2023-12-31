import STATIC_ROUTE_ICONS_SPRITE from "../../public/Assets/svgs/sprites/sprites.svg";

const SIZES = {
  extraLarge: "min-w-[45px] w-[45px] min-h-[45px] h-[45px]",
  large: "min-w-[32px] w-[32px] min-h-[32px] h-[32px]",
  medium: "min-w-[24px] w-[24px] min-h-[24px] h-[24px]",
  small: "min-w-[16px] w-[16px] min-h-[16px] h-[16px]",
};

function SvgSPrite({
  icon,
  size = "medium",
  onClick,
  style = {},
  className,
  sprite = STATIC_ROUTE_ICONS_SPRITE,
  ...props
}) {
  const handleOnClick = (e) => {
    if (onClick) {
      e?.preventDefault();
      e?.stopPropagation();
      onClick?.(e);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className={`inline-flex items-center justify-center overflow-hidden fill-current transition-all duration-100 ${SIZES[size]} ${
        className || ""
      }`}
    >
      <svg className={`${SIZES[size]}`} {...props} style={{ ...style }}>
        <use xlinkHref={`${sprite}#${icon}`} />
      </svg>
    </div>
  );
}

const renderMUIColors = (color) => {
  if (!color) {
    return null;
  }
  let arr = color.split(".");

  if (arr.length === 1) {
    return [color, "main"];
  }

  return arr;
};

export { SvgSPrite };
