import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const CameraForm = ({ onCameraAdded }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      url: Yup.string().required('Required').url('Invalid URL'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/cameras/', values);
        const newCamera = response.data;
        onCameraAdded(newCamera);
        resetForm();
      } catch (error) {
        console.error('Error creating camera:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="url">URL:</label>
      <input
        type="text"
        id="url"
        name="url"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.url}
      />
      {formik.touched.url && formik.errors.url ? (
        <div>{formik.errors.url}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default CameraForm;
