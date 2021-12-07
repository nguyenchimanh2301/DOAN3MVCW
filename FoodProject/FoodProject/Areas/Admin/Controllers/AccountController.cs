using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;
namespace FoodProject.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        // GET: Admin/Account
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Acounts()
        {
           
            return View();
        }
        public ActionResult GetAcounts()
        {
            var lst = db.Usersses.Select(x => new { Users_id = x.Users_id, Passwords = x.Passwords, email=x.email }).ToList();
            return Json(lst,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetID(string id)
        {
            return Json(  new { data = db.Usersses.Select(x => new { x.Users_id, x.Passwords, x.email }).FirstOrDefault(y => y.Users_id == id) }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddAcounts(Userss us)
        {
            int res = 0;
            try
            {
                db.Usersses.Add(us);
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
        public ActionResult DelAcounts(string id)
        {
                var us = db.Usersses.FirstOrDefault(x => x.Users_id == id);
                db.Usersses.Remove(us);
                db.SaveChanges();

   
             return Json(new { kq = "200"}, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateAcounts(Userss us)
        {
            int res = 0;
            try
            {
                db.Usersses.Attach(us);
                db.Entry(us).State = EntityState.Modified;
                db.SaveChanges();
                res = 1;
            }
            catch (Exception e)
            {

                res = 0; ;
            }
            return Json(new { kq = "200", res = res }, JsonRequestBehavior.AllowGet);
        }

       
    }
}