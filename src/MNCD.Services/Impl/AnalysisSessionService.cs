using System;
using System.Collections.Generic;
using System.Linq;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;

namespace MNCD.Services.Impl
{
    public class AnalysisSessionService : IAnalysisSessionService
    {
        private readonly MNCDContext _ctx;

        public AnalysisSessionService(MNCDContext ctx)
        {
            _ctx = ctx;
        }

        public List<AnalysisSession> GetAnalysisSessions()
        {
            return _ctx.AnalysisSessions.OrderBy(a => a.CreateDate).ToList();
        }

        public AnalysisSession GetAnalysisSession(int id)
        {
            // TODO: switch to async
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Session was not found.");
            }

            return session;
        }

        public AnalysisSession GetAnalysisSession(string guid)
        {
            // TODO: switch to async
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Guid == guid);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Session was not found.");
            }

            return session;
        }

        public void AddAnalysisSession(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.");
            }

            var session = new AnalysisSession
            {
                Guid = Guid.NewGuid().ToString(),
                Name = name,
                CreateDate = DateTime.Now
            };

            // TODO: change to async
            _ctx.AnalysisSessions.Add(session);
            _ctx.SaveChanges();
        }

        public void UpdateAnalysisSession(int id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.");
            }

            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Analysis session was not found.");
            }

            session.Name = name;

            // TODO: change to async
            _ctx.SaveChanges();
        }

        public void RemoveAnalysisSession(int id)
        {
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Analysis session was not found.");
            }

            // TODO: change to async
            _ctx.AnalysisSessions.Remove(session);
            _ctx.SaveChanges();
        }
    }
}