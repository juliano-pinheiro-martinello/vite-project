

export function Fieldset({ children, name }: any) {
  return (
    <fieldset className="flex gap-2">
      <legend className="text-start">{name}</legend>
      {children}
    </fieldset>
  )
}