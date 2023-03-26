import { useForm } from "react-hook-form";
import Heading from "./layout/Heading";
import "../css/contact.css";
import DisplayMessage from "./common/DisplayMessage";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Heading content="Contact" />
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Enter firstname</label>
          <input placeholder="Firstname" {...register("firstname", { minLength: 3, required: true })} />
          {errors.firstname && <DisplayMessage messageType="error">Minimum lenght 3</DisplayMessage>}
        </div>

        <div>
          <label>Enter lastname</label>
          <input placeholder="Lastname" {...register("lastname", { minLength: 4, required: true })} />
          {errors.lastname && <DisplayMessage messageType="error">Minimum lenght 4</DisplayMessage>}
        </div>

        <div>
          <label>Enter email</label>
          <input placeholder="Email" {...register("email", { pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, required: true })} />
          {errors.email && <DisplayMessage messageType="error">Must be valid email format</DisplayMessage>}
        </div>

        <div>
          <select {...register("subject", { required: true })}>
            <option value="subject1">Subject 1 default</option>
            <option value="subject2">Subject 2</option>
          </select>
          {errors.option && <DisplayMessage messageType="error">Must select an option</DisplayMessage>}
        </div>

        <div>
          <textarea placeholder="Your message here" className="message-box" {...register("message", { minLength: 10, required: true })} />
          {errors.message && <DisplayMessage messageType="error">Minimum 10 characters</DisplayMessage>}
        </div>

        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default Contact;
