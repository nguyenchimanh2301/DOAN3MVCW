using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;

namespace FoodProject.Areas.Admin.Controllers
{
    public class CategoriiController : Controller
    {
        // GET: Admin/Categorii
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Categori()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetCategori()
        {
            var list = db.LoaiSps.Select(sp => new
            {
                Loaisp_id = sp.Loaisp_id,
                Loaisp_name = sp.Loaisp_name,
                mota = sp.mota,
            }).OrderBy(x=>x.Loaisp_id).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public ActionResult GetLSPID(string id)
        {
            return Json(new { data = db.LoaiSps.Select(x => new { x.Loaisp_id, x.mota, x.Loaisp_name }).FirstOrDefault(y => y.Loaisp_id == id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateLSP(LoaiSp lsp)
        {
            int res = 0;
            try
            {
                db.LoaiSps.Attach(lsp);
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
        public ActionResult SaveLSP(LoaiSp lsp)
        {
            int res = 0;
            try
            {
                db.LoaiSps.Add(lsp);
                db.SaveChanges();
                res = 1;
            }
            catch (Exception e)
            {

                res = 0;
            }
            return Json(new { kq = "200", res = res }, JsonRequestBehavior.AllowGet);
        }
       
       [HttpGet]
        public ActionResult DeleteLSP(string id)
        { 
            var ls = db.LoaiSps.FirstOrDefault(x=>x.Loaisp_id==id);
            db.LoaiSps.Remove(ls);
            db.SaveChanges();
            return Json(new { data = "Ok", }, JsonRequestBehavior.AllowGet);
        }
       
    }
}