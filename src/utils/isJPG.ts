import FileType from "file-type";

export const isJpg = async (filename: string) => {
	const check = await FileType.fromFile(filename);
	return check.ext.toString();
};
