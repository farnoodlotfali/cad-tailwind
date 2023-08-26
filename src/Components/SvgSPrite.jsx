import STATIC_ROUTE_ICONS_SPRITE from "../../public/Assets/svgs/sprites/sprites.svg";

// for size plz look global.css

function SvgSPrite({
  icon,
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
      className={`inline-flex items-center justify-center overflow-hidden fill-current transition-all duration-100  ${
        className || ""
      }`}
    >
      <svg className={``} {...props} style={{ ...style }}>
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
