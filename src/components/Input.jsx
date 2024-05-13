export const Input = ({
  field,
  label,
  value,
  onChangeHandler,
  type,
  showErrorMessage,
  validationMessage,
  onBlurHandler,
  textarea,
}) => {
  const handleValueChange = (event) => {
    onChangeHandler(event.target.value, field);
  };

  const handleInputBlur = (event) => {
    onChangeHandler(event.target.value, field);
  };

  return (
    <>
      <div>
        <span>{label}</span>
      </div>
      {textarea ? (
        <textarea
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            rows={5}
            style={{maxWidth: '400px'}}
        />
      ):(
        <Input
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
        />
      )
      }
    </>
  );
};
