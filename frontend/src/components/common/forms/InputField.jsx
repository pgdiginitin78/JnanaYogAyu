import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({
  sx,
  ref,
  focused,
  variant,
  defaultValue,
  inputProps,
  type,
  disabled,
  inputRef,
  name,
  label,
  error,
  onKeyDown,
  control,
  dontCapitalize,
  color,
  shrink,
  InputLabelProps,
  tableInputField,
  accept,
  id,
  minRows,
  maxRows,
  multiline,
  onChange,
}) => {
  return (
    <FormControl fullWidth size="small" sx={sx}>
      <Controller
        render={({ field }) => {
          return (
            <TextField
              className={
                tableInputField
                  ? "text-[12px]"
                  : "text-[14px]"
              }
              id={id}
              inputRef={inputRef}
              ref={ref ? ref : null}
              autoComplete="new-password"
              onKeyDown={onKeyDown}
              InputProps={{
                disabled: disabled,
              }}
              onChange={onChange ? onChange : field.onChange}
              minRows={minRows}
              maxRows={maxRows}
              multiline={multiline}
              accept={accept}
              InputLabelProps={InputLabelProps}
              inputProps={{
                ...inputProps,
                autoComplete: "new-password",
                autoCapitalize: dontCapitalize ? "none" : "words",
                style: {
                  textTransform: dontCapitalize ? "none" : "capitalize",
                  fontSize: tableInputField ? "12px" : "14px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: multiline ? "auto" : tableInputField ? "28px" : "36px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  "& fieldset": {
                    borderRadius: "4px",
                  },
                },
                "& .MuiInputBase-root": {
                  height: multiline ? "auto" : tableInputField ? "28px" : "36px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                },
                "& .MuiInputBase-input": {
                  boxSizing: "border-box",
                  fontSize: tableInputField ? "12px" : "14px",
                  padding: multiline ? undefined : "6px 14px",
                },
                "& .MuiFormLabel-root": {
                  fontSize: tableInputField ? "12px" : "14px",
                  ...(shrink
                    ? {}
                    : {
                        position: "absolute",
                        top: "0px",
                      }),
                },
              }}
              autoFocus={focused ? true : false}
              onWheel={(e) => {
                if (type === "number") {
                  e.target.blur();
                }
              }}
              type={type}
              disabled={disabled}
              error={!!error?.message}
              color={color}
              variant={variant}
              label={label}
              placeholder={label}
              name={name}
              fullWidth
              {...field}
              size="small"
              shrink={false}
              FormHelperTextProps={{
                sx: { fontSize: "10px", mt: 0, ml: 0 },
              }}
            />
          );
        }}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default InputField;
