interface iInputGroupsProps {
    label: string;
    value: string;

    onChange: (value: string) => void;

    type?: 'text' | 'email' | 'password' | 'number';

    readonly?:boolean;
    required?:boolean;
}
export default function InputGroup({label, onChange, type, value, required, readonly}:iInputGroupsProps) {
    return (
        <div className="flex flex-col mt-4">
            <label>{label}</label>
            <input type={type ?? 'text'}
                   value={value}
                   readOnly={readonly}
                   onChange={(evt) => onChange(evt.target.value)}
                   required={required}
                   className={`
                        px-4 py-3 rounded-lg bg-gray-200 mt-2
                        border focus:border-blue-500
                        focus:outline-none focus:bg-white
                   `}
            />
        </div>
    );
}