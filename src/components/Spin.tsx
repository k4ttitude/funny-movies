import cn from "classnames";

const Spin: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn(
        "animate-spin h-6 w-6 m-auto text-neutral-100",
        className || ""
      )}
    >
      <path
        d="M19.2074 12C19.6451 12 20.0041 11.6443 19.9608 11.2087C19.8313 9.90597 19.3835 8.65062 18.6518 7.55544C17.7727 6.23984 16.5233 5.21446 15.0615 4.60896C13.5997 4.00346 11.9911 3.84504 10.4393 4.15372C9.14742 4.41068 7.94315 4.98175 6.93045 5.81132C6.59181 6.08872 6.59407 6.59407 6.90361 6.90361V6.90361C7.21314 7.21314 7.71237 7.20862 8.05769 6.93959C8.84357 6.32736 9.76436 5.90424 10.7485 5.70848C11.9929 5.46096 13.2827 5.588 14.4548 6.07352C15.627 6.55903 16.6288 7.38123 17.3337 8.43614C17.8912 9.27049 18.2431 10.2208 18.3659 11.2094C18.4198 11.6438 18.7696 12 19.2074 12V12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Spin;
