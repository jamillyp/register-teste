import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import save from '../../assets/save.svg';
import trash from '../../assets/trash.svg';

import "./styles.css";

interface FormProps {
    fields: Array<{}>;
    titleSubmit: string;
    submit: (data: any) => void;
    stateField?: any;
}

export default function Form({ fields, titleSubmit, submit, stateField }: FormProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { pathname } = useLocation();

    useEffect(() => {
        if (stateField) {
            const stateEntry = Object.entries(stateField);
            stateEntry.forEach((entry) => {
                const [key, value] = entry;
                setValue(key, value);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(submit)}>
            {
                fields.map((field: any) => {
                    if (field.type === "text" || field.type === "password") {
                        return (
                            <>
                                <label htmlFor={field.name}>{field.placeholder}<strong>*</strong></label>
                                
                                <input
                                    disabled={field.disabled}
                                    key={field.name}
                                    type={field.type}
                                    {...register(`${field.name}`, { required: field.required })}
                                />
                            </>
                        )
                    } else if (field.type === "date" || field.type === "number" || field.type === "datetime-local") {
                        return (
                            <>

                                <label htmlFor={field.name}>{field.placeholder}</label>
                                <input
                                    disabled={field.disabled}
                                    key={field.name}
                                    type={field.type}
                                    {...register(`${field.name}`, { required: field.required })}
                                    style={{ width: '55%' }}
                                />
                            </>
                        )

                    }
                    else if (field.type === "select") {
                        return (
                            <>
                                <label htmlFor={field.name}>{field.placeholder}</label>
                                <select {...register(`${field.name}`)} id={field.name}>
                                    <option value="">Selecionar...</option>
                                    {
                                        field.options.map((option: any) => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))
                                    }
                                </select>
                            </>
                        );
                    }
                })

            }
            <div id='create-event-buttons'>
                <button type="submit" style={{ color: '#0B610F' }}>
                    {titleSubmit}
                    <img src={save} alt="salvar" />

                </button>
                {
                    pathname === "/createEvent" &&
                    <button type="reset" style={{ color: '#A80004' }}>
                        Limpar
                        <img src={trash} alt="limpar" />
                    </button>
                }
            </div>

        </form>
    );
}