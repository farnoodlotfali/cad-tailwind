import { memo, useState } from "react";

const TextAreaInput = (props) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className=" flex h-full flex-col">
      <label
        htmlFor={props?.id || props?.name}
        className={` relative block  flex-1
            rounded-[5px] border-2  p-4 
            ${
              !!props?.error
                ? "border-red-500"
                : focused
                ? "border-primary-900"
                : "border-primary-light"
            }   
            ${props?.labelClassName || ""}`}
      >
        {!!props?.error && (
          <div
            className={`h-6s pointer-events-none  absolute left-3 top-1/2 flex w-6  -translate-y-1/2 transform 
              items-center justify-center rounded-full bg-red-500 text-white `}
          >
            !
          </div>
        )}
        <textarea
          name={props?.name}
          id={props?.id || props?.name}
          type={props?.type}
          placeholder={props?.placeholder}
          {...props?.register}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`h-full w-full  ${props?.inputClassName || ""} `}
        />
      </label>
      <div className="mt-1 text-start text-xs text-red-500">
        {props?.error?.message}
      </div>
    </div>
  );
};

export default memo(TextAreaInput);
