import mongoose from "mongoose";
const usermodel = mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        pic:{type:String,
            required:true,
            default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXGzeD///+/x9zZ3+rCyt7w8/fY3er6+/zg5O7K0eLT2ef09vn5+fzl6fHp7PPN1OTgq8UiAAAE9UlEQVR4nO2dAZarIAxFEaMCVtz/bj9Y29/OtFOFh4k9vFnA9J6EGCAJSlVVVVVVVX2fiPsHQERRytp5dvbURJFidr0xZvJd+GtPSrOYw0WIobnLa+6ftV9EOnhVO/mxedJ0Nj8LICo4lu8eLXJVfy4W0mQDyHj5ybGwnAzFGv/bIFeNZ2IJ3tW/JYnr5Txrn2iexvckQYb7J26V1q57uUzOZxlN5g/3ussr+Tik+w0kUYORTqPn8TPGTR1JxiHdbUeJxnFyabTb6GH/JdbVaNqL0kRXk/jxJLXPxW66zPJoyO1Y+c80ThoNuU9fyfcahO3RqE9niV8c7t//qHQfWzVZboS7slkCDTfDXXNaHHuSFE+zPp8lRAFujKtaAEtMbSTENJsTyB40ztwkQSlJzEt5/pBmdyeXb8X/8YQZJiQ23CwKZ5gQn3lNQz2QpWmYYbK//U/iXTWE9LKwang3nlCWpmGFsWAYHoj1AzeDYTiyAHIrjPsGmNs//QaYu9AwnCzVMn+p5YzNXwWDDs3VMiBpU2EqTIWpMBWmwhSEAZ6a8cMALjMqTIWpMBWmwlSYClNhKkyFqTAVhkH2e2CoNy325jzAKJ4CGkKfM0d5P7GUBsP3/zceDk8rBTOywKCPmVZ1LDDoi6ZVLG5G6FKTVUx1WmVgeHoe0XUzNxie72YZGJ6aM10GhqeuQYMKmn+IJ5/RiLL53+IJZoVgeNY/YZoAfoglmymVAjCNotAl9gBsnZtFYjMbTIkIwNaqga2dX8RYpo2H4RtFU8DP+JqDCR6cmb4yi+DnAI6PJdgGewrIPR4AydIxN51BG2i4mxuhfsbd24hsOuuYWaDHGgKatXEXAQK6m2FZwMC9ZBSq6bwR0duMawcwAmBg+RlrKrMKNg9AgGFgEcBzcywCRQABgTnkABg/G4VM1YRsagR8/qMwd+givCzeBwJCgJiRQAjTCBp4mr1qxBgmntJkbtFkjANaRftHGz5JSChbRVnlGl7IN2YVqQyaTtqMQ8oIApMwlhgEkvfPAmHS5zUyTzV6IWqTA5pAmPQIIA8m465GHgx9E0xG6iwPxqanZ/Jg0nNNaYN0VY5lLoL2MldlzJ+tMEVFJjkBkAiTyiIRJn0HIA8mo7xBHkzG0GZpMKQzUrOh16JoeuPTj2eG0ffcAHflnjNFiTkEnBFXGlLWDeSyScJVswINn5fyPgjoglbGaTOoeEZGQAPVAch45ABUoSHjbRBQzamI22bYuwAS/AzWRyuh3ATFIiCeIUs02YtnNHK6AXclMLSLlvcwUGPbNEbGTVp8AxTJErLNlucdx7BRNhfs2xNBwzCpw3lIz1teM03iubgj30ANRunRI1qeeab5oNVD2k6FjPLIc8TqIZ3/2txGeVvWPBpXXr5FY8HdJ9lCk2b+kCmyMSDIC4AJigeEUCBStuVBiRqhOx1r02+SIBr8bBHmCUZxZSYy7FPXZ+MQ2Z7Pv541tnMODinHuFR+a5hcanALKOaoD+RWDT7JPGTdVGauTKY6sxMnLhUvzSp3dVO/HSekkjkXYQdoCDjb8tCAImnVv9bgjfqYh9IpUBZ9xNHKlNpBFlBn3u8SFqucB6WJ99TTTC9xSLXnQlk0vtrDEfUnRIm6TPZHZCt32nKARvPoa3TEGUVJDe3d1/ShO/syurjF18AHxmyKo1F0gelRPBrUPz2bUWM3ha37AAAAAElFTkSuQmCC"
        },
    },
    {
        timestamps:true
    }

);

export const  User = mongoose.model("User",usermodel);
