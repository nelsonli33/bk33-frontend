import React, { useState } from "react";
import { classNames } from "../../../../utilities/css";
import { useForm } from "react-hook-form";
import TextField from "../../../elements/TextField";
import Select from "../../../elements/Select";

interface invoiceTypeProps {
  code: string;
  name: string;
}

const invoiceTypes = [
  { code: "personal", name: "二聯式發票(個人)" },
  { code: "company", name: "三聯式發票(公司行號)" },
  { code: "donation", name: "捐贈發票" },
];

const loveCodeOptions = [
  {
    label: "財團法人伊甸社會福利基金會",
    value: "25885",
  },
  {
    label: "社團法人台南市教育及兒童青少年發展協會",
    value: "3339",
  },
  {
    label: "社團法人台灣一起夢想公益協會",
    value: "510",
  },
  {
    label: "其他",
    value: "-1",
  },
];

const invoiceCarruerOptions = [
  {
    label: "會員載具",
    value: "member",
  },
  {
    label: "手機條碼",
    value: "mobile_barcode",
  },
  {
    label: "自然人憑證",
    value: "cititzen_digital_cert",
  },
];

export default function CheckoutInvoice() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      recomm_love_code: "25885",
      invoice_carruer: "member",
    },
  });
  const [invoiceType, setInvoiceType] = useState<invoiceTypeProps>(
    invoiceTypes[0]
  );

  const recommLoveCode = watch("recomm_love_code");
  const invoiceCarruer = watch("invoice_carruer");

  const personalInvoiceDataMarkup = (
    <div className="flex flex-col justify-center space-y-4 mt-3 mb-6 pl-10">
      <div className="flex items-center">
        <Select
          id="invoice_carruer"
          options={invoiceCarruerOptions}
          label="載具"
          register={register}
        />
        {invoiceCarruer === "member" && (
          <div className="ml-4 text-gray-600 text-sm">
            中獎會主動以 E-mail 通知您
          </div>
        )}
      </div>

      {invoiceCarruer === "mobile_barcode" && (
        <div className="flex items-center">
          <TextField
            id="mobile_barcode"
            type="text"
            label="手機條碼載具"
            error=""
            maxLength={8}
            register={register}
          />
          <div className="ml-4 text-sm text-gray-600">
            載具號碼 (/ + 7 個英數字元)
          </div>
        </div>
      )}
      {invoiceCarruer === "cititzen_digital_cert" && (
        <div className="flex items-center">
          <TextField
            id="cititzen_digital_cert"
            type="text"
            label="自然人憑證載具"
            error=""
            register={register}
          />
          <div className="ml-4 text-sm text-gray-600">
            載具號碼 (2 個大寫字母 + 14 位數字)
          </div>
        </div>
      )}
    </div>
  );

  const companyInvoiceDataMarkup = (
    <div className="flex flex-col justify-center space-y-4 mt-3 mb-6 pl-10 max-w-sm">
      <TextField
        id="invoice_title"
        type="text"
        label="發票抬頭"
        error=""
        register={register}
      />
      <TextField
        id="business_number"
        type="text"
        label="統一編號"
        error=""
        register={register}
      />
      <TextField
        id="contact_email"
        type="text"
        label="接收發票的電子郵件"
        error=""
        register={register}
      />
    </div>
  );

  const donationDataMarkup = (
    <div className="flex flex-col justify-center space-y-4 mt-3 mb-6 pl-10 max-w-sm">
      <Select
        id="recomm_love_code"
        options={loveCodeOptions}
        label="捐贈單位"
        register={register}
      />

      {recommLoveCode === "-1" && (
        <TextField
          id="love_code"
          type="text"
          label="捐贈碼"
          maxLength={10}
          error=""
          register={register}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white shadow rounded">
      <div className="text-xl font-medium px-8 pt-3 h-13">發票資訊</div>
      <div className="mt-1">
        <div className="bg-white rounded-md space-y-3 px-8 pb-4">
          {invoiceTypes.map((invType) => (
            <div key={invType.code}>
              <div
                className={classNames(
                  invoiceType && invType.code === invoiceType.code
                    ? "bg-[#F5FBF8] border-[#52BD95] z-10"
                    : "border-gray-200",
                  "relative border rounded-lg p-4 flex cursor-pointer focus:outline-none"
                )}
                onClick={() => setInvoiceType(invType)}
              >
                <span
                  className={classNames(
                    invoiceType && invType.code === invoiceType.code
                      ? "bg-[#52BD95] border-transparent"
                      : "bg-white border-gray-300",
                    "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <span
                    className={classNames(
                      "block text-sm font-medium text-gray-900"
                    )}
                  >
                    {invType.name}
                  </span>
                </div>
              </div>
              {invType.code === "personal" &&
                invoiceType.code === "personal" &&
                personalInvoiceDataMarkup}
              {invType.code === "company" &&
                invoiceType.code === "company" &&
                companyInvoiceDataMarkup}
              {invType.code === "donation" &&
                invoiceType.code === "donation" &&
                donationDataMarkup}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
