import React,{useEffect} from 'react'
import { useForm,useFieldArray ,useController} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Select from 'react-select';
const Register = () => {
  const colourOptions=[
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
  const languageList = [
    { value: 1, label: 'English' },
    { value: 2, label: 'Hindi' }
  ];
  
    const {register,control,handleSubmit,formState,watch,getValues,setValue,setError,reset}=useForm({
      defaultValues:async()=>{
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        const data = await response.json()
        return {
          FirstName:"Pritam",
          LastName:"Saha",
          email:data?.email,
          social:{
            twitter:"",
            facebook:""
          },
          Password:"",
          PasswordConfirmation:"",
          PhoneNumbers:["",""],
          CouponCode:[{
            number:""
          }],
          age:"",
          Dob:""
        }
      }
    });
    const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'language', control });
    const {errors,touchedFields,dirtyFields,isDirty,isSubmitSuccessful}=formState
    console.log("errors",errors,isDirty,isSubmitSuccessful);
    const {fields,append,remove}=useFieldArray({
      name:"CouponCode",
      control
    })
   const onSubmit=(data)=>{
    if(isDirty){
      console.log("data",data);
    }
   }
   const handlegetvalues=()=>{
    console.log("getvalues",getValues(["FirstName","LastName"]));
   }
   const handlesetvalues=()=>{
    setValue("FirstName","",{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
   }
  //  useEffect(() => {
  //   if(isSubmitSuccessful){
  //     reset()
  //   }
  //  }, [reset,isSubmitSuccessful]);
  return (
  <section className="bg-white">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside
        className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Pattern"
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
  
      <main
        aria-label="Main"
        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div className="max-w-xl lg:max-w-3xl">
          <a className="block text-blue-600" href="/">
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>
  
          <h1
            className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Welcome to Squid 🦑
          </h1>
  
          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
            dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
  
          <form 
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-6"
          //noValidate
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                for="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
  
              <input
                type="text"
                id="FirstName"
                 {...register("FirstName",{
                    required:"FirstName is Required"
                 })}
              />
              <p>{errors?.FirstName?.message}</p>
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                for="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
  
              <input
                type="text"
                id="LastName"
                {...register("LastName",{
                    required:"LastName is Required"
                 }
                )}
              />
               <p>{errors?.LastName?.message}</p>
            </div>
  
            <div className="col-span-6">
              <label for="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
  
              <input
                type="email"
                id="Email"
                {...register("email", {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email format",
                    },
                    validate: {
                      notAdmin: (fieldValue) => {
                        return (
                          fieldValue !== "Pritam@yopmail.com" ||
                          "Enter a different email address"
                        );
                      },
                      notBlackListed: (fieldValue) => {
                        return (
                          !fieldValue.endsWith("baddomain.com") ||
                          "This domain is not supported"
                        );
                      },
                      emailAvailable: async (fieldValue) => {
                        const response = await fetch(
                          `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                        );
                        const data = await response.json();
                        return data.length === 0 || "Email already exists";
                      },
                    },
                  })}
              />
              <p>{errors?.email?.message}</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                for="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
  
              <input
                type="number"
                id="age"
                {...register("age",{
                    valueAsNumber:true,
                    required:"Primary Phone Number is Required",
                })}
              />
               <p>{errors?.age?.message}</p> 
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                for="Dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of birth
              </label>
  
              <input
                type="date"
                id="dob"
                {...register("dob",{
                  valueAsDate:true,
                   required:"Date of birth is Required",

                })}
              />
                <p>{errors?.dob?.message}</p> 
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700"
              >
                twitter
              </label>
  
              <input
                type="text"
                id="twitter"
                {...register("social.twitter")}
              />
               <p>{errors?.social?.twitter?.message}</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700"
              >
                facebook
              </label>
  
              <input
                type="text"
                id="facebook"
                {...register("social.facebook")}
              />
               <p>{errors?.social?.facebook?.message}</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                for="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
  
              <input
                type="password"
                id="Password"
                {...register("Password",{
                    required:"Password is Required",
                    validate:(fieldValue)=>{
                        return (
                            fieldValue.length >8 ||
                            "Enter a Strong a password"
                          );
                    }
                })}
              />
               <p>{errors?.Password?.message}</p>
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                for="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
  
              <input
                type="password"
                id="PasswordConfirmation"
                {...register("PasswordConfirmation",
                {
                    disabled:watch("Password")==="",
                    required:"PasswordConfirmation is Required",
                    validate:(fieldValue)=>{
                      return (
                          watch("Password")===fieldValue ||
                          "Confirm password should be same as password"
                        );
                  }
                })}
                onFocus={() => {
                  setError("PasswordConfirmation", { type: 'custom', message: '' });
                }}
              />
              <p>{errors?.PasswordConfirmation?.message}</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                for="PrimaryPhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Primary Phone Number
              </label>
  
              <input
                type="text"
                id="PrimaryPhoneNumber"
                {...register("PhoneNumbers.0",{
                    required:"Primary Phone Number is Required",
                    validate:(fieldValue)=>{
                      return (
                          fieldValue.length <10 ||
                          "Phone Number can't be more than 10 characters"
                        );
                  }
                })}
              />
               {errors?.PhoneNumbers?.length >0 && <p>{errors?.PhoneNumbers[0]?.message}</p> }
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                for="SecondaryPhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Secondary Phone Number
              </label>
  
              <input
                type="text"
                id="SecondaryPhoneNumber"
                {...register("PhoneNumbers.1",{
                    validate:(fieldValue)=>{
                      return (
                          fieldValue.length <10 ||
                          "Phone Number can't be more than 10 characters"
                        );
                  }
                })}
              />
                {errors?.PhoneNumbers?.length >1 && <p>{errors?.PhoneNumbers[1]?.message}</p> }
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                for="Roles"
                className="block text-sm font-medium text-gray-700"
              >
                Langugae
              </label>
              <Select
        className='select-input'
        placeholder="Select Language"
        isClearable
        options={languageList}
        value={langValue ? languageList.find(x => x.value === langValue) : langValue}
        onChange={option => langOnChange(option ? option.value : option)}
        {...restLangField}
      />
              {/* <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        //isRtl={isRtl}
        isSearchable={true}
        name="color"
        options={colourOptions}
      /> */}
            </div>
            <div className="col-span-6">
              <label for="couponcode" className="block text-sm font-medium text-gray-700">
                List of Coupon Codes
              </label>
               {fields?.map((field,index)=>(
                <div key={index} className='flex'>
                  <input
                type="text"
                {...register(`CouponCode.${index}.number`)}
              />
              {
                fields?.length >1 && 
                <button type="button" onClick={()=>remove(index)}> 
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                </button>
               
              }
         

                </div>
               ))}
            <button type="button" onClick={()=>append({numbers:""})}> 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </button>

              
              {/* <p>{errors?.Email?.message}</p> */}
            </div>
            <div className="col-span-6">
              <label for="MarketingAccept" className="flex gap-4">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  {...register("MarketingAccept",
                  {
                      required:"MarketingAccept is Required"
                  })}
                  
                />
                <p>{errors?.MarketingAccept?.message}</p>
                <span className="text-sm text-gray-700">
                  I want to receive emails about events, product updates and
                  company announcements.
                </span>
              </label>
            </div>
      
            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline">
                  terms and conditions
                </a>
                and
                <a href="#" className="text-gray-700 underline">privacy policy</a>.
              </p>
            </div>
           
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
              disabled={!isDirty}
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Create an account
              </button>
              <button
              type="button"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                onClick={handlegetvalues}
              >
                Check values
              </button>
              <button
              type="button"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                onClick={()=>reset()}
              >
                Reset values
              </button>
              <button
              type="button"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                onClick={handlesetvalues}
              >
                Set values
              </button>
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <a href="#" className="text-gray-700 underline">Log in</a>.
              </p>
            </div>
          </form>
          <DevTool control={control}/>
        </div>
      </main>
    </div>
  </section>
  
  )
}

export default Register