import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SearchBox = ({ onSearch }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const onHandleSubmit = (values, actions) => {
    if (!values.search.trim()) {
      toast.error("Please enter movie name to search for it");
      return;
    }
    onSearch(values.search.trim().toLowerCase());
    actions.resetForm();
    setIsFormSubmitted(true);
  };

  return (
    <>
      <div>
        <Formik initialValues={{ search: "" }} onSubmit={onHandleSubmit}>
          <Form>
            <Field className={css.input} name="search" type="text" placeholder="Search movies" autoComplete="off" autoFocus />
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SearchBox;
