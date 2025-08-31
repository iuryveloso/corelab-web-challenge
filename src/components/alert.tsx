interface Alert {
  errors: { message: string }[]
  message: string
  showErrors: boolean
  showMessage: boolean
  children?: React.ReactNode
}

export default function Alert({
  errors,
  message,
  showErrors,
  showMessage,
  children,
}: Alert) {
  return (
    <div className={'fixed z-10 container flex w-full flex-col items-center'}>
      <div
        className={`flex flex-col items-center rounded-lg border border-red-800 bg-red-500 px-2 py-1 text-white sm:px-10 ${showErrors ? '' : 'hidden'}`}
      >
        {errors ? (
          <>
            {errors.map((error, key) => (
              <label key={key}>{error.message}</label>
            ))}
          </>
        ) : (
          false
        )}
      </div>
      <div
        className={`mt-1 flex flex-col items-center rounded-lg border border-green-900 bg-green-600 px-2 py-1 text-white sm:px-10 ${showMessage ? '' : 'hidden'}`}
      >
        {message ? <label>{message}</label> : false}
        {children}
      </div>
    </div>
  )
}
