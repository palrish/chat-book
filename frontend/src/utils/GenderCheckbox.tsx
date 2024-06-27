const GenderCheckbox = ({ onCheckboxChange, selectedGender }: any) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="text-base label-text text-stone-700">Male</span>
          <input
            type="checkbox"
            className="checkbox border-stone-700"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="text-base label-text text-stone-700">Female</span>
          <input
            type="checkbox"
            className="checkbox border-stone-700"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
