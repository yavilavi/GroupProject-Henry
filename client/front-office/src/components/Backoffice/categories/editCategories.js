import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormDefault from '../../FormDefault/FormDefault';

export default function EditCategories({ id }) {
  const [state, setstate] = useState(false);

  const setModalHandler = () => {
    setstate(!state);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: (values) => {
      const newValues = { id, name: values.name };
      alert(JSON.stringify(newValues));
      setTimeout(() => {
        setModalHandler();
        formik.resetForm({ id: '', name: '' });
      }, 1500);
    },
  });

  return (
    <div>
      <Button onClick={setModalHandler} className="btn bg-navy">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={state}>
        <Modal.Header>
          <h3>Edit Category</h3>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <FormDefault
            values={formik.values}
            errors={formik.errors}
            handleChange={formik.handleChange}
            inputType={['text']}
          />
          <Modal.Footer>
            <Button type="submit" className="btn btn-success col-2">
              Edit
            </Button>

            <Button onClick={setModalHandler} className="btn btn-danger col-2">
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
