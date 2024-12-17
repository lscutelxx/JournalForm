import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { FaCalendarAlt, FaFolder } from 'react-icons/fa';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
import { FaArchive } from 'react-icons/fa';

function JournalForm({ addItem, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;
  const titleRef = useRef();
  const postRef = useRef();
  const dateRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { ...data },
    });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.title || !isValid.post) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit === true) {
      addItem(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({
        type: 'SET_VALUE',
        payload: { userId: userId },
      });
    }
  }, [isFormReadyToSubmit, values, addItem, userId]);

  const AddJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId: userId },
    });
  }, [userId]);

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId: userId },
    });
  };

  return (
    <form className={styles['journal-form']} onSubmit={AddJournalItem}>
      <div className={styles['form-row']}>
        <Input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          appearence={'title'}
          isValid={isValid.title}
        />
        {data.id && (
          <button
            className={styles['delete']}
            type="button"
            onClick={deleteJournalItem}
          >
            <FaArchive />
          </button>
        )}
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <FaCalendarAlt />
          <span>Дата</span>
        </label>
        <Input
          id="date"
          type="date"
          name="date"
          value={values.date}
          onChange={onChange}
          ref={dateRef}
          isValid={isValid.date}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <FaFolder />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          name="tag"
          id="tag"
          value={values.tag}
          onChange={onChange}
        />
      </div>

      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post,
        })}
        value={values.post}
        onChange={onChange}
        ref={postRef}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
