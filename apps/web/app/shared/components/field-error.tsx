import type { AnyFieldApi } from "@tanstack/react-form";

const FieldError = ({ field }: { field: AnyFieldApi }) => {
  const isError = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className="mt-2 flex flex-col text-sm text-red-500">
      {isError
        ? field.state.meta.errors.map((err: Error, idx) => (
            <span key={"err" + idx}>{err.message}</span>
          ))
        : null}
    </div>
  );
};

export default FieldError;
