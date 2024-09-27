

export function Input({ name, type, register }: any) {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name} className="">{name}</label>
      <input id={name} type={type} {...register} className="w-full h-8 px-2 outline-1 outline-slate-700 outline rounded-sm" />
    </div>
  )
}