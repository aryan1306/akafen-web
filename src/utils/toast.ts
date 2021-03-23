import { toast } from "react-toastify";

export const notify = (text: string, isError: boolean) => {
	if (isError) {
		return toast.error(text + " ❌", {
			position: "bottom-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
	toast.dark(text, {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const clip = () => {
	return toast.dark("UPI ID Copied", {
		position: "bottom-center",
		autoClose: 1000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
