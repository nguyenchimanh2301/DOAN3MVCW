using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;

namespace FoodProject.Areas.Admin.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Admin/Customer
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();

        }
        public ActionResult Customer()
        {
            return View();
        }
        [HttpGet]
        public JsonResult DeleteKH(string kh)
        {
           var ds = db.KhachHangs.FirstOrDefault(x => x.Khachhang_id == kh);
           db.KhachHangs.Remove(ds);
           db.SaveChanges();
           return Json(new { data = "OK" }, JsonRequestBehavior.AllowGet); ;
        }
        [HttpGet]
       
        public JsonResult GetCus()
        {
            var list = db.KhachHangs.Select(kh => new
            {
                Khachhang_id = kh.Khachhang_id,
                Khachhang_name = kh.Khachhang_name,
                Gioitinh = kh.Gioitinh,
                Ngaysinh = kh.Ngaysinh,
                Diachi = kh.Diachi,
                Sodt = kh.Sodt,
            }
            ).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetKHID(string id)
        {
            return Json(new { data = db.KhachHangs.Select(x => new { x.Khachhang_id, x.Khachhang_name, x.Gioitinh, x.Diachi, x.Sodt,x.Ngaysinh }).FirstOrDefault(y => y.Khachhang_id == id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Update(KhachHang lsp)
        {
            int res = 0;
            try
            {
                db.KhachHangs.Attach(lsp);
                db.Entry(lsp).State = EntityState.Modified;
                db.SaveChanges();
                res = 1;
            }
            catch (Exception e)
            {

                res = 0; ;
            }
            return Json(new { kq = "200", res = res }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveLSP(KhachHang lsp)
        {
            int res = 0;
            try
            {
                db.KhachHangs.Add(lsp);
                db.SaveChanges();
                res = 1;
            }
            catch (Exception e)
            {

                res = 0;
            }
            return Json(new { kq = "200", res = res }, JsonRequestBehavior.AllowGet);
        }
    }
}